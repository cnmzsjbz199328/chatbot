import {pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

// 1. 新增 sessions 表
export const sessionsTable = pgTable("sessions", {
  id: text('id').primaryKey(), // 使用前端生成的UUID
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. 修改现有的 fileTable，添加 session_id
export const fileTable = pgTable("files", {
  id: serial('id').primaryKey(),
  file_name: varchar('file_name').notNull(),
  file_key: varchar('file_key').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  // 新增 sessionId 字段，设置外键和级联删除
  sessionId: text('session_id').references(() => sessionsTable.id, { onDelete: 'cascade' }),
});

export type FileModel = typeof fileTable.$inferSelect;
export type SessionModel = typeof sessionsTable.$inferSelect;
