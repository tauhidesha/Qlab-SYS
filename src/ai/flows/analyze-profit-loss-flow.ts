
'use server';
/**
 * @fileOverview AI flow untuk menganalisis data Laporan Laba Rugi.
 *
 * - analyzeProfitLoss - Fungsi yang menangani proses analisis P&L.
 * - AnalyzeProfitLossInput - Tipe input untuk fungsi analyzeProfitLoss.
 * - AnalyzeProfitLossOutput - Tipe output (return) untuk fungsi analyzeProfitLoss.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncomeBreakdownItemSchema = z.object({
  category: z.string().describe('Kategori pemasukan.'),
  amount: z.number().describe('Jumlah pemasukan untuk kategori ini.'),
});

const ExpenseBreakdownItemSchema = z.object({
  category: z.string().describe('Kategori pengeluaran.'),
  amount: z.number().describe('Jumlah pengeluaran untuk kategori ini.'),
});

const AnalyzeProfitLossInputSchema = z.object({
  period: z.string().describe('Periode laporan, contoh: "Juli 2024".'),
  totalRevenue: z.number().describe('Total pendapatan.'),
  revenueFromServiceSales: z.number().describe('Pendapatan dari penjualan layanan (POS).'),
  revenueFromProductSales: z.number().describe('Pendapatan dari penjualan produk (POS).'),
  revenueFromOtherIncome: z.number().describe('Pendapatan dari sumber lain.'),
  otherIncomeBreakdown: z.array(IncomeBreakdownItemSchema).describe('Rincian pendapatan lain per kategori.'),
  totalExpenses: z.number().describe('Total biaya/pengeluaran.'),
  expensesBreakdown: z.array(ExpenseBreakdownItemSchema).describe('Rincian biaya per kategori.'),
  netProfit: z.number().describe('Laba atau rugi bersih.'),
});
export type AnalyzeProfitLossInput = z.infer<typeof AnalyzeProfitLossInputSchema>;

const AnalyzeProfitLossOutputSchema = z.object({
  summary: z.string().describe('Ringkasan singkat tentang performa keuangan pada periode tersebut. Sebutkan apakah secara umum baik, cukup, atau perlu perhatian, berdasarkan laba bersih dan komponen utama.'),
  keyObservations: z.array(z.string()).describe('Beberapa poin observasi kunci (2-4 poin). Fokus pada kontributor terbesar pendapatan dan biaya, atau item yang menonjol. Hindari perbandingan dengan periode sebelumnya karena data tidak tersedia.'),
  recommendations: z.array(z.string()).describe('Beberapa saran umum atau area yang mungkin perlu ditinjau lebih lanjut (1-2 poin). Jika tidak ada yang spesifik, bisa berikan saran umum untuk menjaga performa atau meningkatkan efisiensi.'),
});
export type AnalyzeProfitLossOutput = z.infer<typeof AnalyzeProfitLossOutputSchema>;


export async function analyzeProfitLoss(input: AnalyzeProfitLossInput): Promise<AnalyzeProfitLossOutput> {
  return analyzeProfitLossFlow(input);
}

const analyzePrompt = ai.definePrompt({
  name: 'analyzeProfitLossPrompt',
  input: {schema: AnalyzeProfitLossInputSchema},
  output: {schema: AnalyzeProfitLossOutputSchema},
  prompt: `Anda adalah seorang analis bisnis yang bertugas menganalisis Laporan Laba Rugi sebuah bengkel.
Data Laporan Laba Rugi untuk periode {{{period}}}:
- Total Pendapatan: Rp {{{totalRevenue}}}
  - Pendapatan dari Penjualan Layanan (POS): Rp {{{revenueFromServiceSales}}}
  - Pendapatan dari Penjualan Produk (POS): Rp {{{revenueFromProductSales}}}
  - Pendapatan Lain-lain: Rp {{{revenueFromOtherIncome}}}
    {{#if otherIncomeBreakdown.length}}
    Rincian Pendapatan Lain:
    {{#each otherIncomeBreakdown}}
    - {{{category}}}: Rp {{{amount}}}
    {{/each}}
    {{else}}
    (Tidak ada rincian pendapatan lain)
    {{/if}}
- Total Biaya: Rp {{{totalExpenses}}}
  {{#if expensesBreakdown.length}}
  Rincian Biaya:
  {{#each expensesBreakdown}}
  - {{{category}}}: Rp {{{amount}}}
  {{/each}}
  {{else}}
  (Tidak ada rincian biaya)
  {{/if}}
- Laba/Rugi Bersih: Rp {{{netProfit}}}

Tugas Anda:
1.  Berikan **ringkasan** singkat (1-2 kalimat) tentang performa keuangan bengkel pada periode ini. Sebutkan apakah secara umum baik, standar, atau ada area yang perlu perhatian khusus, terutama berdasarkan laba bersih dan kontributor utama seperti perbandingan pendapatan layanan vs produk.
2.  Sebutkan 2-4 **observasi kunci**. Fokus pada:
    *   Komponen pendapatan terbesar (misalnya, penjualan layanan vs. produk vs. pendapatan lain).
    *   Kategori biaya terbesar.
    *   Jika ada kategori pendapatan lain atau biaya yang nilainya signifikan atau tidak biasa (jika bisa dinilai tanpa data historis).
    *   Sebutkan nilai laba bersihnya dan apakah itu positif atau negatif.
3.  Berikan 1-2 **rekomendasi** umum yang relevan atau area yang mungkin bisa dieksplorasi lebih lanjut untuk meningkatkan profitabilitas atau efisiensi. Jika performa sudah baik, bisa berupa saran untuk mempertahankan. Jangan membuat asumsi atau perbandingan dengan periode sebelumnya karena data tersebut tidak disediakan.

Gunakan bahasa yang lugas dan mudah dipahami untuk pemilik bengkel. Pastikan output Anda sesuai dengan skema output yang diminta.
Sajikan angka dalam format Rupiah jika relevan dalam kalimat (misalnya, "Laba bersih sebesar Rp 10.000.000 menunjukkan...").
`,
});

const analyzeProfitLossFlow = ai.defineFlow(
  {
    name: 'analyzeProfitLossFlow',
    inputSchema: AnalyzeProfitLossInputSchema,
    outputSchema: AnalyzeProfitLossOutputSchema,
  },
  async (input) => {
    const {output} = await analyzePrompt(input);
    if (!output) {
        throw new Error("Gagal mendapatkan output dari prompt analisis P&L.");
    }
    return output;
  }
);
