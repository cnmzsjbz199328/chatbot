import { pgTable, serial, varchar, timestamp, text, uuid, json } from "drizzle-orm/pg-core";

// 1. 改造现有 sessions 表，支持渐进式迁移
export const sessionsTable = pgTable("sessions", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  // 新增：关联到 Supabase 用户（迁移期间可为null）
  userId: uuid('user_id'), // 允许null以保持兼容性
});

// 2. 改造 fileTable，支持双重关联（迁移期间）
export const fileTable = pgTable("files", {
  id: serial('id').primaryKey(),
  file_name: varchar('file_name').notNull(),
  file_key: varchar('file_key').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  // 保持现有session关联（迁移期间）
  sessionId: text('session_id').references(() => sessionsTable.id, { onDelete: 'cascade' }),
  // 新增：Supabase user ID 关联
  userId: uuid('user_id'), // 迁移期间允许null
});

// 3. 新增：用户资料扩展表（可选）
export const userProfilesTable = pgTable("user_profiles", {
  id: uuid('id').primaryKey(), // 对应 Supabase auth.users.id
  username: varchar('username', { length: 50 }).unique(), // 唯一用户名，用于URL
  displayName: text('display_name'),
  avatar: text('avatar'),
  bio: text('bio'),
  location: text('location'),
  phone: text('phone'),
  website: text('website'),
  github: text('github'),
  linkedin: text('linkedin'),
  skills: json('skills').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. 用户项目表
export const userProjectsTable = pgTable("user_projects", {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(), // 关联到 Supabase 用户
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  technologies: json('technologies').$type<string[]>(),
  status: varchar('status', { length: 50 }).default('active'), // active, completed, archived
  progress: varchar('progress', { length: 10 }).default('0'), // 进度百分比
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SessionModel = typeof sessionsTable.$inferSelect;
export type FileModel = typeof fileTable.$inferSelect;
export type UserProfileModel = typeof userProfilesTable.$inferSelect;
export type UserProjectModel = typeof userProjectsTable.$inferSelect;
