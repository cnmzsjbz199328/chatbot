# RAG 系统实施开发计划

## 概述

本计划基于 `ragsystemreview.md` 的审查报告和 `WebsiteAndChatbotDevelopmentGuide.md` 的整体架构指南，详细阐述了实现完整 RAG（检索增强生成）系统的逐步修改和测试步骤。重点解决两个断点：

1. **Ingestion Gap**：文件上传后进行 PDF 解析、文本分块、向量化并存储到 Pinecone 用户命名空间。
2. **Retrieval Gap**：聊天查询时从用户命名空间检索相关文档片段，并增强系统提示。

**前提假设**：
- Supabase Auth 已集成（参考指南第1-2步），确保 API 路由有用户认证。
- Pinecone 已配置，支持用户命名空间隔离（参考指南第2.2节）。
- 环境变量已设置，包括 `PINECONE_API_KEY`、`PINECONE_INDEX_NAME`、`COHERE_API_KEY` 等。
- `pdf-parse` 依赖已安装（在 `package.json` 中）。

**总体原则**：
- 渐进式开发：每个阶段独立测试，避免破坏现有功能。
- 用户隔离：所有操作基于当前认证用户 ID。
- 错误处理：添加 try-catch 和日志记录。
- 测试：结合单元测试、API 测试和端到端测试。

## 准备阶段：验证环境和认证

### 步骤 1.1：确认 Supabase 和 Auth 集成
- **修改**：确保 `src/lib/auth.ts` 存在并包含 `getAuthenticatedUser()` 函数（参考指南第2.1节）。
- **代码检查**：
  - 在所有相关 API（如 `/api/upload` 和 `/api/chat`）开头添加用户认证检查：
    ```typescript
    import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

    export async function POST(req: Request) {
      const user = await getAuthenticatedUser();
      if (!user) return unauthorizedResponse();
      // ... 后续逻辑
    }
    ```
- **测试**：
  1. 运行 `npm run dev`。
  2. 未log in访问 `/api/upload` 或 `/api/chat`，应返回 401 Unauthorized。
  3. log in后访问，应成功（即使无其他逻辑）。

### 步骤 1.2：确认 Pinecone 用户命名空间
- **修改**：更新 `src/lib/pinecone.ts` 以支持用户命名空间（参考指南第2.2节）。
  - 确保 `getUserNamespace(userId: string)` 和 `getIndexForUser(userId: string)` 函数可用。
- **测试**：
  1. 在控制台或临时脚本中测试：
     ```typescript
     // 测试脚本：node test-pinecone.js
     import { getIndexForUser } from '@/lib/pinecone';
     const userIndex = getIndexForUser('test-user-id');
     console.log('Namespace ready');
     ```
  2. 运行脚本，无错误表示配置正确。

### 步骤 1.3：安装额外依赖（如果需要）
- **命令**：虽然 `pdf-parse` 已安装，但确认文本分块工具（如 `@langchain/text-splitter`）：
  ```bash
  npm install @langchain/text-splitter
  ```
- **测试**：运行 `npm run lint` 和 `npm run build`，确保无依赖错误。

## 第一阶段：打通上传 -> 存储流程 (Ingestion)

**目标**：改造 `/api/upload/route.ts`，在文件保存后添加 PDF 解析、分块、嵌入和 Pinecone 存储。

### 步骤 2.1：更新上传 API 路由
- **文件**：`src/app/api/upload/route.ts`
- **修改**：
  1. 导入必要模块：
     ```typescript
     import pdf from 'pdf-parse';
     import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
     import { getEmbedding } from '@/lib/custom-embedding';
     import { getIndexForUser } from '@/lib/pinecone';
     import fs from 'fs/promises';
     import path from 'path';
     ```
  2. 在 POST 处理中，文件保存后添加解析逻辑：
     ```typescript
     export async function POST(req: Request) {
       const user = await getAuthenticatedUser();
       if (!user) return unauthorizedResponse();

       try {
         const formData = await req.formData();
         const file = formData.get('file') as File;
         if (!file || file.type !== 'application/pdf') {
           return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 });
         }

         // 保存文件到 public/uploads
         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);
         const fileName = file.name;
         const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
         await fs.writeFile(filePath, buffer);

         // 解析 PDF
         const pdfData = await pdf(buffer);
         const fullText = pdfData.text;

         // 分块（使用 LangChain splitter）
         const splitter = new RecursiveCharacterTextSplitter({
           chunkSize: 1000,
           chunkOverlap: 200,
         });
         const chunks = await splitter.splitText(fullText);

         // 为每个 chunk 生成嵌入并存储到 Pinecone
         const userIndex = getIndexForUser(user.id);
         const vectors = [];
         for (const [i, chunk] of chunks.entries()) {
           const embedding = await getEmbedding(chunk);
           vectors.push({
             id: `${fileName}_${i}`,
             values: embedding,
             metadata: {
               text: chunk,
               fileName: fileName,
               userId: user.id,
               chunkIndex: i,
             },
           });
         }

         // Upsert 到用户命名空间
         await userIndex.upsert(vectors);

         // 数据库记录（更新 files 表）
         // ... 插入到 Drizzle files 表，包含 userId

         return NextResponse.json({ message: 'File processed and embedded successfully' });
       } catch (error) {
         console.error('Upload error:', error);
         return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
       }
     }
     ```
- **注意**：调整现有文件保存和数据库插入逻辑，确保兼容 sessionId（如果适用）。

### 步骤 2.2：处理非 PDF 文件（可选扩展）
- **修改**：如果需要支持其他格式（如 TXT），添加条件判断：
  ```typescript
  if (file.type === 'text/plain') {
    const text = await file.text();
    // 直接分块 text
  }
  ```

### 测试阶段 1：Ingestion 测试
1. **单元测试**：
   - 创建测试文件 `tests/upload.test.ts`（使用 Jest 或 Vitest）：
     ```typescript
     // 模拟 PDF buffer，测试 pdf-parse 和 splitter
     ```
   - 运行 `npm test`。

2. **API 测试**：
   - 使用 Postman 或 curl 上传 PDF 文件（需先log in获取 token）。
   - 检查响应：成功时返回 "processed successfully"。
   - 验证 Pinecone：使用 Pinecone 控制台查询用户命名空间，确认向量已 upsert（包含 metadata）。

3. **端到端测试**：
   - 浏览器中log in，上传 PDF。
   - 检查 `public/uploads` 有文件，数据库有记录，Pinecone 有数据。
   - 不同用户上传，确认隔离（用户 A 看不到用户 B 的向量）。

4. **错误测试**：
   - 上传非 PDF：返回 400。
   - 未log in：返回 401。
   - 大文件：监控内存/超时。

## 第二阶段：实现公开聊天与RAG检索 (Public Chat & Retrieval)

**核心目标**：改造 `/api/chat/route.ts`，使其成为一个**公开的、无需log in**的API。该API能够根据前端传递的`targetUsername`（简历主人的用户名），安全地从该用户的私有知识库中检索信息，并生成回答。

### 步骤 3.1：修复核心聊天功能 (Immediate Priority)

本步骤旨在立刻修复当前的API报错，让聊天功能可以针对公开访问者正常工作。

- **子步骤 3.1.1: 将聊天API设为公开接口**
  - **文件**: `src/app/api/chat/route.ts`
  - **操作**: 移除文件开头的用户认证代码块。
    ```typescript
    // 删除以下代码
    const user = await getAuthenticatedUser();
    if (!user) {
      return unauthorizedResponse();
    }
    ```
  - **理由**: 访问者无需log in。此修改将立即解决`AuthSessionMissingError`和401 Unauthorized错误。API将依赖请求体中的`targetUsername`来定位知识库。

- **子步骤 3.1.2: 验证并巩固数据检索逻辑**
  - **文件**: `src/app/api/chat/route.ts`
  - **操作**: 审查并确认后续的数据检索流程安全、正确。
    1.  **确认用户名到ID的映射**: 检查API是否能根据`targetUsername`从`user_profiles`表正确查询到`userId`。
    2.  **确认知识库隔离**: 确认Pinecone查询中包含`filter: { user_id: { '$eq': targetUserId } }`，确保数据严格隔离。
    3.  **更新AI模型**: 将`model: cohere('command-r-plus')` 更新为 `model: cohere('command-r')` 或其他当前可用的模型。
  - **理由**: 确保核心RAG流程不仅能跑通，而且安全、可靠，并使用有效的AI模型。

### 步骤 3.2：增强API的安全性与稳定性

公开的API必须防止滥用，否则会产生高昂的成本或导致服务中断。

- **子步骤 3.2.1: 实施IP级别的速率限制 (Rate Limiting)**
  - **文件**: `src/app/api/chat/route.ts`
  - **操作**: 为聊天API添加速率限制器。例如，使用一个简单的Map或Upstash Redis来限制同一个IP地址在1分钟内最多请求20次。
    ```typescript
    // 示例逻辑
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    // ... 实现计数和检查逻辑 ...
    if (isRateLimited) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    ```
  - **理由**: 保护API不被恶意攻击或爬虫滥用，有效控制Pinecone和AI模型的调用成本。

### 步骤 3.3：统一并优化后台架构

此步骤旨在清理技术债，让整个项目的后端架构更一致、更稳健。

- **子步骤 3.3.1: 统一Supabase客户端的创建方式**
  - **文件**: `src/lib/auth.ts` 和 `src/lib/supabase/server.ts`
  - **操作**: 重构`src/lib/auth.ts`中的`getAuthenticatedUser`函数，使其统一使用`src/lib/supabase/server.ts`中定义的、基于`@supabase/ssr`的`createClient`函数。
  - **理由**: 尽管聊天API是公开的，但文件上传等功能仍需认证。统一客户端能从根本上解决所有与`cookie`相关的潜在冲突，使代码库更健康、更易于维护。

- **子步骤 3.3.2: 清理废弃代码**
  - **文件**: `src/lib/auth.ts`
  - **操作**: 在统一客户端后，移除对`@supabase/auth-helpers-nextjs`这个旧库的依赖和导入。
  - **理由**: 保持代码整洁，移除不必要的依赖。

## 第三阶段：测试与验证

- **测试 3.1: 核心功能测试 (E2E)**
  1.  **公开访问**: 在未log in状态下，访问一个用户的个人主页。
  2.  **提问**: 向聊天机器人提问一个与该用户上传文档相关的问题。
  3.  **验证回答**: 确认聊天机器人能根据文档内容给出正确回答。
  4.  **验证隔离**: 访问另一个用户的页面，提问关于第一个用户文档的问题，确认机器人无法回答（返回“信息未提供”等）。

- **测试 3.2: 安全性测试**
  1.  **速率限制**: 使用脚本或工具（如curl循环）快速连续请求`/api/chat`，确认在达到阈值后收到`429 Too Many Requests`错误。

- **测试 3.3: 认证功能回归测试**
  1.  **文件上传**: log in一个账户，确认文件上传功能依然正常工作。
  2.  **其他需认证的API**: 检查所有需要log in才能访问的API，确保它们在架构统一后不受影响。

## 第四阶段：部署与监控

- **步骤 4.1: 集成与构建**
  - 运行 `npm run build`，修复任何构建错误。
  - 检查并更新 Vercel 环境变量，确保所有必需的key都已设置。

- **步骤 4.2: 监控与优化**
  - **添加日志**: 在`api/chat`的关键步骤（如获取用户名、查询Pinecone、调用AI）添加详细的`console.log`，以便在Vercel后台追踪和调试。
  - **优化**: 根据实际使用情况，调整速率限制的阈值、Pinecone查询的`topK`值等参数。
