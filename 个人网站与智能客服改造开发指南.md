# 个人网站与智能客服改造开发指南 (Supabase + Drizzle)

## 1. 项目技术要点分析 (已更新)

-   **前端框架**: [Next.js](https://nextjs.org/) (App Router)
-   **认证服务**: [Supabase Auth](https://supabase.com/docs/guides/auth)
-   **数据库**: [Supabase Postgres](https://supabase.com/docs/guides/database)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **向量数据库**: [Pinecone](https://www.pinecone.io/)
-   **UI/样式**: [Tailwind CSS](https://tailwindcss.com/) / [shadcn/ui](https://ui.shadcn.com/)

## 2. 改造核心目标

1.  **实现多租户模式**: 引入 Supabase 用户sign up、log in、鉴权系统。
2.  **数据完全隔离**: 确保每个用户的数据在 PostgreSQL 和 Pinecone 中严格隔离。
3.  **集成前端设计**: 将 `frontendDesign/` 的 HTML 转化为 React 组件。

## 3. 迭代开发步骤 (混合模式版)

### 第一步：配置 Supabase 并连接 Drizzle

**1.1 创建 Supabase 项目**

1.  访问 [supabase.com](https://supabase.com/) 并创建一个新项目。
2.  进入项目设置 (Project Settings) > API，找到并保存你的 **项目 URL** 和 **`anon` public key**。
3.  进入数据库设置 (Database settings)，找到 **Connection string** (URI 格式)，并保存。这串字符是 Drizzle 连接数据库的关键。

**1.2 安装并配置 Supabase Auth**

安装 Supabase 的 Next.js Auth Helpers，它能简化服务端和客户端的认证流程。

```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

**1.3 更新环境变量 (`.env.local`)**

在项目根目录创建或修改 `.env.local` 文件，填入你获取到的密钥。

```bash
# Supabase Auth Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Drizzle DB Connection String (from Supabase Database Settings)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres

# 保持现有的其他环境变量
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX_NAME=chatbot-384
COHERE_API_KEY=your-cohere-key

# 新增：应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**重要提醒：**
- Supabase的`anon key`是公开的，可以在客户端使用
- 真正的数据安全靠RLS (Row Level Security)策略保证
- 生产环境记得更新`NEXT_PUBLIC_APP_URL`

**1.4 更新数据库 Schema (`src/db/schema.ts`)**

Supabase Auth 会自动管理一个 `auth.users` 表。我们不需要自己创建 `users` 表，但需要在我们的表中引用它。

```typescript
import { pgTable, serial, varchar, timestamp, text, uuid } from "drizzle-orm/pg-core";

// 注意：我们不再自己创建 users 表，但为了类型安全和外键引用，
// 我们可以定义一个结构来代表 Supabase 的用户。
// Drizzle 目前不直接支持跨 Schema 引用，所以我们用 uuid 来关联。

// 改造现有 sessions 表，支持渐进式迁移
export const sessionsTable = pgTable("sessions", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  // 新增：关联到 Supabase 用户（迁移期间可为null）
  userId: uuid('user_id'), // 允许null以保持兼容性
});

// 改造 fileTable，支持双重关联（迁移期间）
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

// 新增：用户资料扩展表（可选）
export const userProfilesTable = pgTable("user_profiles", {
  id: uuid('id').primaryKey(), // 对应 Supabase auth.users.id
  displayName: text('display_name'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SessionModel = typeof sessionsTable.$inferSelect;
export type FileModel = typeof fileTable.$inferSelect;
export type UserProfileModel = typeof userProfilesTable.$inferSelect;
```

**重要：数据库安全设置**

在Supabase Dashboard中，需要启用Row Level Security (RLS)：

```sql
-- 在Supabase SQL编辑器中执行
-- 1. 启用RLS
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 2. 创建安全策略（用户只能访问自己的数据）
CREATE POLICY "Users can only see their own files" ON public.files
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own sessions" ON public.chat_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own profile" ON public.user_profiles
  FOR ALL USING (auth.uid() = id);
```

**1.5 生成并应用数据库迁移**

此步骤不变，但它现在会在你的 Supabase 数据库的 `public` schema 中创建或修改表。

```bash
# 1. 生成迁移文件
npx drizzle-kit generate

# 2. 将变更应用到 Supabase 数据库
npx drizzle-kit push
```

### 第二步：改造 API 与实现数据隔离

**2.1 保护 API 路由**

在 API 路由中，使用 Supabase Auth Helpers 获取当前用户，然后用 `userId` 来过滤 Drizzle 查询。

**创建认证工具函数 (`src/lib/auth.ts`)：**
```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function getAuthenticatedUser() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return null;
  }
  
  return session.user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**示例 (改造现有 `upload/route.ts`):**
```typescript
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
import { db } from '@/db';
import { fileTable } from '@/db/schema';
// ... 其他现有imports

export async function POST(req: Request) {
  // 1. 验证用户认证
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorizedResponse();
  }

  // 2. 获取session_id（兼容期间）
  const sessionId = req.headers.get('X-Session-Id');
  
  try {
    // ... 你现有的文件处理逻辑 ...

    // 3. 数据库插入 - 同时支持userId和sessionId（迁移期间）
    const insertData: any = {
      fileName: fileName,
      fileKey: fileKey,
      userId: user.id, // Supabase用户ID
    };
    
    // 兼容期间：如果有sessionId也保存
    if (sessionId) {
      insertData.sessionId = sessionId;
    }

    const fileRecord = await db.insert(fileTable).values(insertData).returning();

    // 4. 向量处理 - 使用用户ID作为namespace
    await processAndEmbedChunks(chunks, fileRecord[0].id, user.id);

    return NextResponse.json({ 
      message: "File uploaded successfully",
      fileId: fileRecord[0].id 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

**2.2 隔离向量数据库 (Pinecone)**

**更新 `src/lib/pinecone.ts` 以支持用户隔离：**

```typescript
import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME || 'chatbot-384';
  return pc.index(indexName);
};

// 新增：用户命名空间管理
export const getUserNamespace = (userId: string) => {
  return `user_${userId.replace(/-/g, '_')}`; // 确保namespace格式合规
};

export const getIndexForUser = (userId: string) => {
  const index = getIndex();
  const namespace = getUserNamespace(userId);
  return index.namespace(namespace);
};

// 兼容函数：支持session和用户双重模式
export const getPineconeFilter = (userId?: string, sessionId?: string) => {
  if (userId) {
    return { user_id: { '$eq': userId } };
  }
  if (sessionId) {
    return { session_id: { '$eq': sessionId } };
  }
  throw new Error('Either userId or sessionId must be provided');
};
```

**改造 `chat/route.ts`：**
```typescript
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
import { getIndexForUser, getPineconeFilter } from '@/lib/pinecone';
// ... 其他imports

export async function POST(req: Request) {
  // 1. 验证用户
  const user = await getAuthenticatedUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const { messages } = await req.json();
    // ... 处理消息逻辑 ...

    // 2. 向量查询 - 优先使用namespace，降级到filter
    const useNamespace = process.env.PINECONE_USE_NAMESPACE === 'true';
    
    let queryResult;
    if (useNamespace) {
      // 使用namespace隔离（推荐）
      const userIndex = getIndexForUser(user.id);
      queryResult = await userIndex.query({
        topK: 3,
        vector: queryVector,
        includeMetadata: true,
      });
    } else {
      // 使用filter隔离（兼容模式）
      const index = getIndex();
      queryResult = await index.query({
        topK: 3,
        vector: queryVector,
        includeMetadata: true,
        filter: getPineconeFilter(user.id),
      });
    }

    // ... 处理查询结果和生成回复 ...
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}
```

### 第三步：集成前端页面与逻辑

**3.1 转化 HTML 为 React 组件**

此步骤不变。将 `frontendDesign/` 中的 HTML 转化为 `src/app/` 目录下的 React 页面组件。

**3.2 实现前端认证逻辑**

使用 `supabase-js` 客户端在前端处理用户sign up和log in。

**示例 (在log in页面组件中):**

```tsx
'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error('Sign in error', error.message);
    else console.log('Signed in!', data);
    // 之后可以路由跳转 router.push('/dashboard');
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    // ...
  };

  // ...你的 JSX 表单
}
```

### 4. 前端集成 - 创建认证组件

**4.1 创建Supabase客户端 (`src/lib/supabase.ts`)：**
```typescript
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// 客户端使用
export const createClient = () => createClientComponentClient();

// 服务端组件使用
export const createServerClient = () => createServerComponentClient({ cookies });
```

**4.2 创建认证Provider (`src/components/AuthProvider.tsx`)：**
```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

**4.3 更新Layout (`src/app/layout.tsx`)：**
```tsx
import { AuthProvider } from '@/components/AuthProvider';
// ... 其他imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 5. 数据迁移策略

**5.1 现有数据处理：**

由于你的系统已有基于session的数据，需要制定迁移策略：

```sql
-- 方案1：创建匿名用户迁移现有数据（在Supabase SQL编辑器执行）
-- 注意：这个脚本需要根据实际情况调整

-- 为每个现有session创建一个匿名用户
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password, 
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  'anonymous_' || id || '@temp.local',
  '', -- 空密码，这些用户无法正常log in
  now(),
  created_at,
  created_at
FROM sessions 
WHERE id NOT IN (SELECT session_id FROM files WHERE user_id IS NOT NULL);

-- 更新files表，关联到新创建的匿名用户
-- （这个逻辑比较复杂，建议在应用层通过API完成）
```

**5.2 渐进式迁移方案：**

1. **第一阶段**：新用户使用Supabase Auth，现有session继续工作
2. **第二阶段**：提供"账户升级"功能，让匿名用户sign up正式账户
3. **第三阶段**：逐步清理匿名数据

### 6. 测试与验证

**6.1 基础功能测试：**
1. **sign up与log in**：使用新UI，通过Supabase创建用户并log in
2. **数据隔离测试**：
   - 用户Alog in，上传文件并聊天
   - 用户Blog in，验证无法看到用户A的数据
3. **RLS策略验证**：直接查询数据库确保策略生效

**6.2 性能测试：**
1. **Pinecone Namespace测试**：验证用户间向量完全隔离
2. **数据库查询性能**：确保RLS不影响正常查询速度

**6.3 安全测试：**
1. **JWT Token验证**：确保过期token被正确拒绝
2. **API访问控制**：未log in用户无法访问受保护资源
3. **跨用户数据访问**：尝试访问其他用户数据应被阻止