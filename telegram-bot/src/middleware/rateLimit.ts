/**
 * Rate Limiting Middleware
 * Prevent spam and abuse
 */

const userRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

export const rateLimitMiddleware = async (ctx: any, next: any) => {
  const userId = ctx.from?.id?.toString();
  if (!userId) return next();

  const now = Date.now();
  const userStats = userRequestCounts.get(userId);

  if (!userStats || now > userStats.resetTime) {
    // Reset counter
    userRequestCounts.set(userId, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return next();
  }

  if (userStats.count >= RATE_LIMIT) {
    await ctx.reply(
      '⏰ *Slow down!*\n\n' +
      'Terlalu banyak pesan dalam waktu singkat. ' +
      'Tunggu sebentar sebelum kirim pesan lagi ya.',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Increment counter
  userStats.count++;
  return next();
};
