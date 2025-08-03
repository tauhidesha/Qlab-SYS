/**
 * Logging Middleware
 * Log all conversations for analytics and debugging
 */

export const loggingMiddleware = async (ctx: any, next: any) => {
  const start = Date.now();
  const userId = ctx.from?.id;
  const userName = ctx.from?.first_name || 'Unknown';
  const message = ctx.message?.text || 'Non-text message';

  console.log(`📥 [${new Date().toISOString()}] User ${userName} (${userId}): ${message}`);

  try {
    await next();
    const duration = Date.now() - start;
    console.log(`📤 [${new Date().toISOString()}] Response sent in ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`❌ [${new Date().toISOString()}] Error after ${duration}ms:`, error);
    throw error;
  }
};
