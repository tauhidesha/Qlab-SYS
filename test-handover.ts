// test-handover.ts
import 'dotenv/config';
import { notifyBosMat } from './src/ai/utils/humanHandoverTool';

(async () => {
  await notifyBosMat('628123456789', 'Tes pesan dari script', 'Testing fetch ke WhatsApp server');
  console.log('Done');
})();
