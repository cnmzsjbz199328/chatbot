import { db } from '@/db';
import { userProfilesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// 从email生成用户名
export function generateUsernameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  // 清理用户名，只保留字母数字和下划线
  return localPart.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
}

// 检查用户名是否可用
export async function isUsernameAvailable(username: string): Promise<boolean> {
  try {
    const existingUser = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.username, username))
      .limit(1);
    
    return existingUser.length === 0;
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false;
  }
}

// 生成唯一用户名
export async function generateUniqueUsername(baseUsername: string): Promise<string> {
  let username = baseUsername;
  let counter = 1;
  
  while (!(await isUsernameAvailable(username))) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  
  return username;
}

// 获取或创建用户profile
export async function getOrCreateUserProfile(userId: string, email: string) {
  try {
    // 首先尝试获取现有profile
    const existingProfile = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.id, userId))
      .limit(1);

    if (existingProfile.length > 0) {
      return existingProfile[0];
    }

    // 如果不存在，创建新profile
    const baseUsername = generateUsernameFromEmail(email);
    const uniqueUsername = await generateUniqueUsername(baseUsername);

    const [newProfile] = await db
      .insert(userProfilesTable)
      .values({
        id: userId,
        username: uniqueUsername,
        displayName: email.split('@')[0], // 使用email前缀作为显示名
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newProfile;
  } catch (error) {
    console.error('Error getting or creating user profile:', error);
    throw error;
  }
}
