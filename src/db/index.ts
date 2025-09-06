import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt } from 'drizzle-orm';
import { fileTable, sessionsTable } from './schema';
  
const db = drizzle(process.env.DATABASE_URL!);

// Session管理函数
export const upsertSession = async (sessionId: string, expiresAt: Date) => {
  return await db.insert(sessionsTable).values({
    id: sessionId,
    expiresAt
  }).onConflictDoUpdate({
    target: sessionsTable.id,
    set: {
      expiresAt
    }
  }).returning();
};

export const getExpiredSessions = async () => {
  return await db.select().from(sessionsTable).where(
    lt(sessionsTable.expiresAt, new Date())
  );
};

export const deleteExpiredSessions = async () => {
  return await db.delete(sessionsTable).where(
    lt(sessionsTable.expiresAt, new Date())
  ).returning({ id: sessionsTable.id });
};

// 文件管理函数 (添加session_id支持)
export const insertFile = async (file_name: string, file_key: string, sessionId: string): Promise<{ id: number }[]> => {
  return await db.insert(fileTable).values({
    file_name,
    file_key,
    sessionId
  }).returning({ id: fileTable.id });
};

export const getFile = async (sessionId?: string) => {
  if (sessionId) {
    return await db.select().from(fileTable).where(eq(fileTable.sessionId, sessionId));
  }
  return await db.select().from(fileTable);
};

export const deleteFileById = async (id: number, sessionId?: string) => {
  if (sessionId) {
    // 验证文件属于当前session
    await db.delete(fileTable).where(
      and(
        eq(fileTable.id, id),
        eq(fileTable.sessionId, sessionId)
      )
    );
  } else {
    await db.delete(fileTable).where(eq(fileTable.id, id));
  }
};

export { db };
