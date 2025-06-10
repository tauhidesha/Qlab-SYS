
import { config } from 'dotenv';
config();

// import '@/ai/flows/visualize-repaint.ts'; // Fitur AI Visualizer telah dihapus
import '@/ai/flows/analyze-profit-loss-flow.ts';
import '@/ai/flows/cs-whatsapp-reply-flow.ts';

import '@/ai/tools/productLookupTool.ts';
import '@/ai/tools/clientLookupTool.ts';
