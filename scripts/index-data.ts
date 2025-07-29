// @file: scripts/index-data.ts

import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, ' ')
  });
  return response.data[0].embedding;
}

function extractChunksFromMarkdown(fileContent: string, fileName: string) {
  const chunks: {
    content: string;
    serviceName: string;
    category: string;
    metadata: any;
  }[] = [];

  const fileNameLower = fileName.toLowerCase();

  if (fileNameLower.includes('faq')) {
    chunks.push({
      content: fileContent.trim(),
      serviceName: 'Tanya Jawab Umum',
      category: 'FAQ',
      metadata: {
        source: fileName,
        category: 'FAQ',
        serviceName: 'Tanya Jawab Umum'
      }
    });
    return chunks;
  }

  const isPromo = fileContent.toLowerCase().includes('promo bundling');
  const layananBlocks = isPromo
    ? [fileContent]
    : fileContent.split(/(?=#### )/g);

  let currentCategory = 'Uncategorized';
  const categoryRegex = /### Kategori: (.+)/;

  for (const block of layananBlocks) {
    const categoryMatch = block.match(categoryRegex);
    if (categoryMatch) currentCategory = categoryMatch[1].trim();

    const serviceMatch = block.match(/^#### (.+)/);
    const serviceName = isPromo
      ? 'Promo Bundling Repaint + Detailing'
      : serviceMatch?.[1]?.trim() ?? 'Unknown';

    const category = isPromo
      ? 'Promo'
      : categoryMatch?.[1]?.trim() ?? 'Uncategorized';

    if (!isPromo && !serviceMatch) continue;

    chunks.push({
      content: block.trim(),
      serviceName,
      category,
      metadata: {
        serviceName,
        category,
        source: fileName,
      }
    });
  }

  return chunks;
}

async function main() {
  console.log("🚀 Mulai indexing ke Supabase...");

  const filesToProcess = ['FAQ.md']; // bisa ditambahin promo.md, faq.md
  const dataPath = path.resolve('./src/data');

  for (const fileName of filesToProcess) {
    const fullPath = path.join(dataPath, fileName);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ File ${fileName} tidak ditemukan, skip.`);
      continue;
    }

    const rawContent = fs.readFileSync(fullPath, 'utf-8');
    const chunks = extractChunksFromMarkdown(rawContent, fileName);

    for (const chunk of chunks) {
      console.log(`📌 Embedding: ${chunk.serviceName} (${chunk.category})`);
      try {
        const embedding = await createEmbedding(chunk.content);

        const { data, error } = await supabase.from('documents').insert({
          content: chunk.content,
          embedding,
          metadata: chunk.metadata
        });

        if (error) {
          console.error(`❌ Gagal simpan: ${chunk.serviceName}`, error.message);
        } else {
          console.log(`✅ Disimpan: ${chunk.serviceName}`);
        }
      } catch (err) {
        console.error(`❌ Error embedding: ${chunk.serviceName}`, (err as any).message);
      }
    }
  }

  console.log("✅ Selesai indexing.");
}

main();
