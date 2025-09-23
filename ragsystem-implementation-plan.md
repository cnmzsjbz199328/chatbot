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
  2. 未登录访问 `/api/upload` 或 `/api/chat`，应返回 401 Unauthorized。
  3. 登录后访问，应成功（即使无其他逻辑）。

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
   - 使用 Postman 或 curl 上传 PDF 文件（需先登录获取 token）。
   - 检查响应：成功时返回 "processed successfully"。
   - 验证 Pinecone：使用 Pinecone 控制台查询用户命名空间，确认向量已 upsert（包含 metadata）。

3. **端到端测试**：
   - 浏览器中登录，上传 PDF。
   - 检查 `public/uploads` 有文件，数据库有记录，Pinecone 有数据。
   - 不同用户上传，确认隔离（用户 A 看不到用户 B 的向量）。

4. **错误测试**：
   - 上传非 PDF：返回 400。
   - 未登录：返回 401。
   - 大文件：监控内存/超时。

## 第二阶段：打通提问 -> 检索流程 (Retrieval)

**目标**：改造 `/api/chat/route.ts`，在生成响应前添加查询嵌入、检索和提示增强。

### 步骤 3.1：更新聊天 API 路由
- **文件**：`src/app/api/chat/route.ts`
- **修改**：
  1. 导入模块：
     ```typescript
     import { getEmbedding } from '@/lib/custom-embedding';
     import { getIndexForUser } from '@/lib/pinecone';
     import { generateText } from 'ai'; // 或 Cohere SDK
     ```
  2. 在 POST 处理中，消息处理后添加检索逻辑：
     ```typescript
     export async function POST(req: Request) {
       const user = await getAuthenticatedUser();
       if (!user) return unauthorizedResponse();

       try {
         const { messages } = await req.json();
         const lastMessage = messages[messages.length - 1].content;

         // 现有逻辑：获取 profile 和 projects（但根据审查，不再注入到提示中）
         // const systemPrompt = `You are a helpful assistant focused on the user's uploaded documents. Do not repeat profile or project info.`;

         // 生成查询嵌入
         const queryEmbedding = await getEmbedding(lastMessage);

         // 从用户命名空间检索
         const userIndex = getIndexForUser(user.id);
         const queryResult = await userIndex.query({
           vector: queryEmbedding,
           topK: 5,
           includeMetadata: true,
         });

         // 提取相关 chunks
         const relevantChunks = queryResult.matches.map(match => match.metadata?.text || '').join('\n\n');

         // 增强系统提示
         const enhancedPrompt = `
         Based on the following retrieved documents from the user's knowledge base:
         ${relevantChunks}

         Answer the user's question: ${lastMessage}

         Focus only on the knowledge base; do not include or repeat user profile or project information.
         `;

         // 调用 Cohere 生成响应
         const { text } = await generateText({
           model: 'command', // 或 Cohere 模型
           prompt: enhancedPrompt,
         });

         return NextResponse.json({ reply: text });
       } catch (error) {
         console.error('Chat error:', error);
         return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
       }
     }
     ```
- **注意**：移除原有 profile/projects 注入到提示中，转而专注于检索 chunks。更新前端 `ChatContainer.tsx` 以传递仅消息，不再打包 profile。

### 步骤 3.2：更新前端聊天组件
- **文件**：`src/components/ChatContainer.tsx`
- **修改**：停止发送 profile/projects 到 API，只发送消息历史。
  ```tsx
  // 在发送请求时
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }), // 无 profile
  });
  ```

### 测试阶段 2：Retrieval 测试
1. **单元测试**：
   - 测试 `getEmbedding` 和 Pinecone query：
     ```typescript
     // 模拟查询，验证 topK 返回相关 chunks
     ```

2. **API 测试**：
   - 发送聊天请求（包含已上传 PDF 的问题）。
   - 检查响应：包含基于文档的答案，无 profile 重复。
   - 无文档时：应优雅处理（e.g., "No relevant info found"）。

3. **端到端测试**：
   - 上传 PDF，提问文档内容。
   - 验证答案准确，基于 chunks。
   - 不同用户：用户 A 提问用户 B 的文档，应无结果或默认响应。
   - 性能：响应时间 < 5s。

4. **错误测试**：
   - 无效查询：正常响应。
   - Pinecone 错误：回退到基本提示。

## 部署与监控阶段

### 步骤 4.1：集成与构建
- 运行 `npm run build`，修复任何错误。
- 更新 Vercel 配置（`vercel.json`），确保环境变量。

### 步骤 4.2：监控与优化
- 添加日志：使用 `console.log` 或集成 Sentry。
- 优化：监控 chunk 大小、topK 值、嵌入维度。
- 扩展：支持更多文件类型、会话记忆。

### 步骤 4.3：最终验证
1. 多用户场景：创建 2-3 测试用户，上传不同 PDF，交叉提问。
2. 负载测试：上传大 PDF（>10MB），多查询。
3. 安全审计：确认 RLS 和命名空间隔离。

完成本计划后，系统将实现完整的用户隔离 RAG 功能，支持基于上传文档的智能回答。
