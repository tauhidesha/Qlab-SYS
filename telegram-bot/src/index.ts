/**
 * QLAB Telegram Bot - Main Entry Point
 * 
 * Conversational AI assistant for QLAB POS system
 * Built with ❤️ for effortless business management
 */

import { Telegraf, Context } from 'telegraf';
import { MiraAssistant } from './bot/mira';
import { authMiddleware } from './middleware/auth';
import { loggingMiddleware } from './middleware/logging';
import { rateLimitMiddleware } from './middleware/rateLimit';

// Environment validation
if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const mira = new MiraAssistant();

// Apply middleware
bot.use(loggingMiddleware);
bot.use(authMiddleware);
bot.use(rateLimitMiddleware);

// Handle /start command
bot.start(async (ctx: Context) => {
  const welcomeMessage = `
🤖 *Halo! Saya Mira, AI assistant untuk QLAB POS*

Saya di sini untuk membantu Anda mengelola bisnis tanpa ribet. 
Gak perlu hafal command - tinggal chat aja kayak ngobrol sama admin kasir!

*Contoh yang bisa Anda tanya:*
• "Gimana penjualan hari ini?"
• "Catat pengeluaran bensin 50ribu"
• "Siapa customer yang datang hari ini?"
• "Ada yang aneh gak?"

Yuk, mulai ngobrol! 💬
  `;
  
  await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
});

// Handle all text messages
bot.on('text', async (ctx: Context) => {
  try {
    const userMessage = ctx.message?.text;
    if (!userMessage) return;

    // Show typing indicator
    await ctx.sendChatAction('typing');

    // Process message with Mira
    const response = await mira.processMessage(userMessage, {
      userId: ctx.from?.id.toString() || '',
      userName: ctx.from?.first_name || 'User',
      chatId: ctx.chat?.id.toString() || ''
    });

    // Send response
    await ctx.reply(response, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: true 
    });

  } catch (error) {
    console.error('Error processing message:', error);
    await ctx.reply(
      '😅 Maaf, ada gangguan sebentar. Coba ulangi lagi ya!',
      { parse_mode: 'Markdown' }
    );
  }
});

// Handle voice messages (future feature)
bot.on('voice', async (ctx: Context) => {
  await ctx.reply(
    '🎤 Voice processing belum tersedia. Tapi saya siap dengar via text! 😊'
  );
});

// Handle photos (future feature)
bot.on('photo', async (ctx: Context) => {
  await ctx.reply(
    '📸 Image recognition coming soon! Sementara describe aja dulu ya.'
  );
});

// Error handling
bot.catch((err: any, ctx: Context) => {
  console.error('Bot error:', err);
  ctx.reply('😔 Something went wrong. Please try again.');
});

// Start the bot
async function startBot() {
  try {
    console.log('🚀 Starting QLAB Telegram Bot...');
    
    // Initialize Mira
    await mira.initialize();
    console.log('🤖 Mira is ready!');

    // Start polling
    await bot.launch();
    console.log('✅ Bot is running!');

    // Graceful shutdown
    process.once('SIGINT', () => {
      console.log('🛑 Stopping bot...');
      bot.stop('SIGINT');
    });
    
    process.once('SIGTERM', () => {
      console.log('🛑 Stopping bot...');
      bot.stop('SIGTERM');
    });

  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

// Run the bot
startBot();

export default bot;
