import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { fileTable } from './schema';
  
const db = drizzle(process.env.DATABASE_URL!);

export const insertFile = async (file_name: string, file_key: string ): Promise<{ id: number }[]> => {
  return await db.insert(fileTable).values({
    file_name,
    file_key
  }).returning({ id: fileTable.id });
};

export const getFile = async () => {
  const file = await db.select().from(fileTable);
  return file;
};

export const deleteFileById = async (id: number) => {
  await db.delete(fileTable).where(eq(fileTable.id, id));
};
