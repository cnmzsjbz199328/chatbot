import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt } from 'drizzle-orm';
import * as schema from './schema';

const db = drizzle(process.env.DATABASE_URL!, { schema });

// Session管理函数
export const upsertSession = async (sessionId: string, expiresAt: Date) => {
  return await db.insert(schema.sessionsTable).values({
    id: sessionId,
    expiresAt
  }).onConflictDoUpdate({
    target: schema.sessionsTable.id,
    set: {
      expiresAt
    }
  }).returning();
};

export const getExpiredSessions = async () => {
  return await db.select().from(schema.sessionsTable).where(
    lt(schema.sessionsTable.expiresAt, new Date())
  );
};

export const deleteExpiredSessions = async () => {
  return await db.delete(schema.sessionsTable).where(
    lt(schema.sessionsTable.expiresAt, new Date())
  ).returning({ id: schema.sessionsTable.id });
};

// 文件管理函数 (添加session_id支持)
export const insertFile = async (file_name: string, file_key: string, sessionId?: string, userId?: string): Promise<{ id: number }[]> => {
  const values = {
    file_name,
    file_key,
    sessionId: sessionId || null,
    userId: userId || null,
  };
  
  return await db.insert(schema.fileTable).values(values).returning({ id: schema.fileTable.id });
};

export const getFile = async (sessionId?: string, userId?: string) => {
  if (userId) {
    return await db.select().from(schema.fileTable).where(eq(schema.fileTable.userId, userId));
  }
  if (sessionId) {
    return await db.select().from(schema.fileTable).where(eq(schema.fileTable.sessionId, sessionId));
  }
  return await db.select().from(schema.fileTable);
};

export const deleteFileById = async (id: number, sessionId?: string, userId?: string) => {
  const conditions = [eq(schema.fileTable.id, id)];

  if (sessionId) {
    conditions.push(eq(schema.fileTable.sessionId, sessionId));
  }

  if (userId) {
    conditions.push(eq(schema.fileTable.userId, userId));
  }

  await db.delete(schema.fileTable).where(and(...conditions));
};

export { db };