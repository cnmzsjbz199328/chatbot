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
export const insertFile = async (file_name: string, file_key: string, sessionId?: string, userId?: string): Promise<{ id: number }[]> => {
  const values = {
    file_name,
    file_key,
    sessionId: sessionId || null,
    userId: userId || null,
  };
  
  return await db.insert(fileTable).values(values).returning({ id: fileTable.id });
};

export const getFile = async (sessionId?: string, userId?: string) => {
  if (userId) {
    return await db.select().from(fileTable).where(eq(fileTable.userId, userId));
  }
  if (sessionId) {
    return await db.select().from(fileTable).where(eq(fileTable.sessionId, sessionId));
  }
  return await db.select().from(fileTable);
};

export const deleteFileById = async (id: number, sessionId?: string, userId?: string) => {
  const conditions = [eq(fileTable.id, id)];

  if (sessionId) {
    conditions.push(eq(fileTable.sessionId, sessionId));
  }

  if (userId) {
    conditions.push(eq(fileTable.userId, userId));
  }

  await db.delete(fileTable).where(and(...conditions));
};

export { db };
