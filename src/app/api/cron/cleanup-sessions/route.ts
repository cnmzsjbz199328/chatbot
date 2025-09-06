import { NextRequest, NextResponse } from 'next/server';
import { deleteExpiredSessions } from '@/db';
import { getIndex } from '@/lib/pinecone';

export async function GET(request: NextRequest) {
  try {
    // 安全检查 - 只允许Vercel Cron或特定token调用
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET || 'your-secret-token';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('[Cleanup] Starting expired sessions cleanup...');

    // 1. 删除过期的session，同时获取被删除的session IDs
    const deletedSessions = await deleteExpiredSessions();
    const expiredSessionIds = deletedSessions.map(session => session.id);

    console.log(`[Cleanup] Found ${expiredSessionIds.length} expired sessions`);

    if (expiredSessionIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No expired sessions found',
        deletedSessions: 0,
        deletedVectors: 0
      });
    }

    // 2. 从Pinecone删除相关向量数据
    let deletedVectorCount = 0;
    try {
      const index = getIndex();
      
      // 为每个过期的session删除向量
      for (const sessionId of expiredSessionIds) {
        try {
          await index.deleteMany({
            filter: {
              session_id: { '$eq': sessionId }
            }
          });
          console.log(`[Cleanup] Deleted vectors for session: ${sessionId}`);
          deletedVectorCount++;
        } catch (vectorError) {
          console.error(`[Cleanup] Failed to delete vectors for session ${sessionId}:`, vectorError);
        }
      }
    } catch (pineconeError) {
      console.error('[Cleanup] Pinecone cleanup failed:', pineconeError);
      // 继续执行，因为PostgreSQL清理已经完成
    }

    console.log(`[Cleanup] Cleanup completed. Sessions deleted: ${expiredSessionIds.length}, Vector batches processed: ${deletedVectorCount}`);

    return NextResponse.json({
      success: true,
      message: 'Cleanup completed successfully',
      deletedSessions: expiredSessionIds.length,
      deletedVectorBatches: deletedVectorCount,
      expiredSessionIds
    });

  } catch (error) {
    console.error('[Cleanup] Cleanup process failed:', error);
    return NextResponse.json(
      { 
        error: 'Cleanup process failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
