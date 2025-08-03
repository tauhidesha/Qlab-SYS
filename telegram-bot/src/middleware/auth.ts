/**
 * Authentication Middleware
 * Only authorized users can chat with Mira
 */

import { Context, MiddlewareFn } from 'telegraf';

const AUTHORIZED_USERS = [
  process.env.ADMIN_TELEGRAM_ID,
  process.env.MANAGER_TELEGRAM_ID,
  // Add more authorized user IDs here
].filter(Boolean);

const USER_ROLES: Record<string, string> = {
  [process.env.ADMIN_TELEGRAM_ID || '']: 'admin',
  [process.env.MANAGER_TELEGRAM_ID || '']: 'manager',
};

export const authMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  const userId = ctx.from?.id?.toString();
  
  if (!userId) {
    await ctx.reply('❌ Unable to verify user identity');
    return;
  }

  if (!AUTHORIZED_USERS.includes(userId)) {
    await ctx.reply(
      '🚫 *Access Denied*\n\n' +
      'Maaf, Anda tidak memiliki akses ke QLAB AI Assistant.\n' +
      'Hubungi administrator untuk mendapatkan akses.',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Add user role to context
  (ctx as any).userRole = USER_ROLES[userId] || 'staff';
  
  return next();
};

export const requireRole = (allowedRoles: string[]): MiddlewareFn<Context> => {
  return async (ctx, next) => {
    const userRole = (ctx as any).userRole;
    
    if (!allowedRoles.includes(userRole)) {
      await ctx.reply(
        '⛔ *Insufficient Permissions*\n\n' +
        `Fitur ini memerlukan role: ${allowedRoles.join(', ')}\n` +
        `Role Anda: ${userRole}`,
        { parse_mode: 'Markdown' }
      );
      return;
    }
    
    return next();
  };
};
