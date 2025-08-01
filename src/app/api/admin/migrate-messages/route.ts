// @file: src/app/api/admin/migrate-messages/route.ts

import { NextResponse } from 'next/server';
import { migrateDirectMessagesToSubcollection, checkMigrationStatus } from '@/ai/utils/migrateDirectMessages';

export async function GET() {
  try {
    const status = await checkMigrationStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('[MIGRATION API] Error checking status:', error);
    return NextResponse.json(
      { error: 'Failed to check migration status' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Simple protection - use the same CRON_SECRET
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[MIGRATION API] Starting migration...');
    const result = await migrateDirectMessagesToSubcollection();
    
    return NextResponse.json({
      success: true,
      message: `Migration completed. Migrated: ${result.migrated}, Errors: ${result.errors}`,
      result
    });
  } catch (error) {
    console.error('[MIGRATION API] Migration failed:', error);
    return NextResponse.json(
      { 
        error: 'Migration failed', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
