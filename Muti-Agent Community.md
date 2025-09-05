# Multi-Agent Community 开发文档 v2.0

## 项目概述

基于现有的 **RAG PDF 聊天机器人** 的成功实现，本项目将系统升级为一个自主的多Agent社区系统。当前项目已实现了完整的RAG功能、云端embedding服务集成、现代化UI设计和多轮对话能力，为Multi-Agent扩展奠定了坚实的技术基础。

### 当前项目成果 ✅

#### 技术栈已就绪
- **前端框架**: Next.js 15.5.2 + TypeScript + React 19.1.0
- **样式系统**: Tailwind CSS + 现代化响应式UI设计
- **状态管理**: TanStack Query v5 + React Hooks
- **AI集成**: Vercel AI SDK + Cohere Command-R模型
- **向量数据库**: Pinecone (384维索引，优化配置)
- **关系数据库**: PostgreSQL + Drizzle ORM
- **云端服务**: 自建embedding服务 (https://embedding.badtom.dpdns.org)

#### 核心功能已实现
- ✅ **PDF文档处理**: 完整的上传、解析、分块、向量化流程
- ✅ **智能检索**: 基于语义相似度的文档检索
- ✅ **多轮对话**: 基于Vercel AI SDK的上下文感知对话
- ✅ **文件管理**: 完整的CRUD操作，包含乐观更新
- ✅ **响应式UI**: 移动端、平板端、桌面端适配
- ✅ **性能优化**: 批量embedding处理，大幅提升处理速度

#### 架构优势
- **云原生架构**: 分离的embedding服务，易于扩展
- **模块化设计**: 清晰的前后端分离，组件可复用
- **类型安全**: 完整的TypeScript覆盖
- **现代化UI**: 基于设计系统的用户界面

### Multi-Agent升级愿景

本升级将在现有稳定架构基础上，通过**渐进式改造**实现多Agent社区功能：

- **个体性**：每个Agent拥有独特的性格、记忆和目标
- **社交性**：Agent之间可以交流、合作和形成关系  
- **分层记忆**：基于现有Pinecone架构扩展的三层记忆系统
- **自主进化**：基于交互和经历动态更新记忆和行为
- **向下兼容**：保持现有RAG功能的同时，增加Agent能力

## 系统架构升级

### 基于现有架构的扩展策略

当前系统的优秀架构为Multi-Agent扩展提供了理想基础：

```
现有架构 (已稳定运行):
├── Next.js 前端
│   ├── 响应式UI组件 ✅
│   ├── TanStack Query状态管理 ✅  
│   ├── 多轮对话界面 ✅
│   └── 文件管理界面 ✅
├── API路由层
│   ├── /api/chat (RAG对话) ✅
│   ├── /api/upload (文档处理) ✅
│   ├── /api/files (文件管理) ✅
│   └── 云端embedding集成 ✅
├── 数据存储层
│   ├── PostgreSQL (文件元数据) ✅
│   ├── Pinecone (384维向量) ✅
│   └── 云端embedding服务 ✅
└── AI集成层
    ├── Cohere Command-R ✅
    ├── all-MiniLM-L6-v2 (384维) ✅
    └── 批量处理优化 ✅

Multi-Agent扩展层 (新增):
├── Agent管理层
│   ├── Agent类架构
│   ├── 性格建模系统
│   ├── 决策引擎
│   └── 行为调度器
├── 记忆管理层
│   ├── 基于现有Pinecone的命名空间扩展
│   ├── 个人/群体/公共记忆分层
│   ├── 记忆重要性评估
│   └── 时间衰减机制
├── 社交交互层
│   ├── Agent间通信协议
│   ├── 群体动态管理
│   ├── 关系建模
│   └── 事件系统
└── 前端扩展层
    ├── Agent管理界面
    ├── 社区监控面板
    ├── 交互可视化
    └── 性格配置器
```

### 升级后的Pinecone命名空间设计

基于现有的`chatbot-384`索引，采用命名空间扩展策略：

```
Pinecone Index: chatbot-384 (现有，继续使用)
├── default (当前RAG文档，保持不变)
│   ├── 用户上传的PDF文档向量
│   └── file_id元数据标记
├── agent-{agentId} (新增：个人命名空间)
│   ├── memories-short-term      # 短期记忆
│   ├── memories-long-term       # 长期记忆  
│   ├── personality-traits       # 性格特征向量
│   ├── personal-knowledge       # 个人知识
│   ├── goals-current           # 当前目标
│   └── relationships           # 关系记录
├── group-{groupId} (新增：群体命名空间)
│   ├── shared-knowledge        # 共享知识
│   ├── group-dynamics          # 群体动态
│   ├── collective-memories     # 集体记忆
│   └── group-goals            # 群体目标
└── public-community (新增：公共命名空间)
    ├── world-knowledge         # 世界知识
    ├── community-events        # 社区事件
    ├── shared-resources        # 共享资源
    └── universal-facts         # 通用知识
```

### 现有技术栈的Multi-Agent适配

#### 保持现有技术优势
- **Next.js 15.5.2**: 性能优异，支持复杂交互界面
- **Vercel AI SDK**: 已验证的多轮对话能力，易于扩展多Agent对话
- **Pinecone**: 384维配置性能优秀，命名空间完美支持分层记忆
- **云端Embedding**: 批量处理能力强，支持Agent大规模记忆操作
- **PostgreSQL + Drizzle**: 成熟的关系数据管理，适合Agent元数据

#### 技术栈增强
```typescript
// 新增依赖 (基于现有package.json)
{
  "dependencies": {
    // 现有依赖保持不变...
    "@ai-sdk/cohere": "^2.0.7",      // ✅ 已有
    "@pinecone-database/pinecone": "^6.1.2",  // ✅ 已有
    "drizzle-orm": "^0.44.5",        // ✅ 已有
    
    // 新增Agent相关依赖
    "uuid": "^9.0.0",               // Agent ID生成
    "cron": "^3.1.6",               // 定时任务调度
    "ws": "^8.14.2",                // WebSocket实时通信
    "redis": "^4.6.8",              // 缓存和会话管理
    "zod": "^3.22.4"                // 数据验证
  }
}
```

## 数据库设计扩展

### 基于现有数据库的渐进式扩展

现有数据库结构 (保持不变):
```typescript
// src/db/schema.ts (现有)
export const fileTable = pgTable("files", {
  id: serial('id').primaryKey(),           // ✅ 已有
  file_name: varchar('file_name').notNull(),  // ✅ 已有  
  file_key: varchar('file_key').notNull(),    // ✅ 已有
  createdAt: timestamp('createdAt').defaultNow(), // ✅ 已有
});
```

新增Agent相关表结构:
```typescript
// src/db/schema.ts (扩展)

// Agent 基本信息表
export const agentTable = pgTable("agents", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  avatar: varchar('avatar', { length: 255 }),
  personality_profile: jsonb('personality_profile').notNull(), // BigFive + 自定义特征
  system_prompt: text('system_prompt'), // Agent的系统提示词
  creation_date: timestamp('creation_date').defaultNow(),
  last_active: timestamp('last_active').defaultNow(),
  status: varchar('status', { length: 20 }).default('active'), // active, sleeping, busy
  creator_user_id: varchar('creator_user_id'), // 创建者ID，便于管理
});

// Agent与文档的关联表 (扩展现有文件系统)
export const agentDocumentTable = pgTable("agent_documents", {
  id: serial('id').primaryKey(),
  agent_id: integer('agent_id').references(() => agentTable.id),
  file_id: integer('file_id').references(() => fileTable.id), // 复用现有文件表
  access_level: varchar('access_level', { length: 20 }).default('read'), // read, write, exclusive
  associated_at: timestamp('associated_at').defaultNow(),
});

// Agent 群体关系表
export const groupTable = pgTable("groups", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // family, team, community, study_group
  description: text('description'),
  privacy_level: varchar('privacy_level', { length: 20 }).default('public'), // public, private, invite_only
  created_at: timestamp('created_at').defaultNow(),
  creator_agent_id: integer('creator_agent_id').references(() => agentTable.id),
});

// Agent-群体关联表
export const agentGroupTable = pgTable("agent_groups", {
  id: serial('id').primaryKey(),
  agent_id: integer('agent_id').references(() => agentTable.id),
  group_id: integer('group_id').references(() => groupTable.id),
  role: varchar('role', { length: 50 }).default('member'), // member, moderator, admin
  joined_at: timestamp('joined_at').defaultNow(),
  contribution_score: real('contribution_score').default(0), // 贡献度评分
});

// 交互记录表 (扩展现有对话系统)
export const interactionTable = pgTable("interactions", {
  id: serial('id').primaryKey(),
  session_id: varchar('session_id').notNull(), // 对话会话ID
  from_agent_id: integer('from_agent_id').references(() => agentTable.id),
  to_agent_id: integer('to_agent_id').references(() => agentTable.id), // null表示与用户交互
  interaction_type: varchar('interaction_type', { length: 50 }).notNull(), // chat, document_share, task_collaboration
  content: text('content').notNull(),
  context: jsonb('context'), // 交互上下文，包含文档引用等
  timestamp: timestamp('timestamp').defaultNow(),
  importance_score: real('importance_score').default(0.5), // 0-1 重要性评分
  emotional_tone: varchar('emotional_tone', { length: 20 }), // positive, neutral, negative
});

// 记忆快照表 (支持记忆版本管理)
export const memorySnapshotTable = pgTable("memory_snapshots", {
  id: serial('id').primaryKey(),
  agent_id: integer('agent_id').references(() => agentTable.id),
  snapshot_type: varchar('snapshot_type', { length: 30 }).notNull(), // daily, weekly, major_event
  memory_summary: text('memory_summary'), // 记忆摘要
  pinecone_namespace: varchar('pinecone_namespace').notNull(), // 对应的Pinecone命名空间
  vector_count: integer('vector_count').default(0), // 向量数量统计
  created_at: timestamp('created_at').defaultNow(),
  importance_threshold: real('importance_threshold').default(0.5), // 记忆筛选阈值
});
```

### 数据库迁移策略

```typescript
// 渐进式迁移计划
// Phase 1: 添加Agent基础表，不影响现有功能
// Phase 2: 添加交互记录表，开始记录Agent对话
// Phase 3: 添加群体和记忆管理表
// Phase 4: 添加高级功能表

// 迁移脚本示例
export const migrationV2 = {
  up: async (db) => {
    // 添加Agent相关表，保持现有表结构不变
    await db.schema.createTable('agents').ifNotExists().execute();
    // 添加索引优化查询性能
    await db.schema.createIndex('idx_agent_status').on('agents').column('status').execute();
    await db.schema.createIndex('idx_interaction_session').on('interactions').column('session_id').execute();
  },
  down: async (db) => {
    // 回滚策略，确保系统稳定性
    await db.schema.dropTable('agents').ifExists().execute();
  }
};
```

## 核心类设计升级

### 基于现有架构的Agent类设计

```typescript
// src/lib/agent/Agent.ts (新增)

interface PersonalityProfile {
  // BigFive 性格模型 (0-1 范围)
  openness: number;        // 开放性
  conscientiousness: number; // 尽责性
  extraversion: number;    // 外向性
  agreeableness: number;   // 宜人性
  neuroticism: number;     // 神经质
  
  // 自定义特征 (0-1 范围)
  curiosity: number;       // 好奇心
  empathy: number;         // 同理心
  creativity: number;      // 创造力
  analytical: number;      // 分析能力
  social: number;          // 社交倾向
}

interface AgentMemory {
  id: string;
  content: string;
  type: 'conversation' | 'document' | 'experience' | 'relationship' | 'goal';
  importance: number;      // 0-1
  recency: number;         // 基于时间衰减
  access_count: number;    // 访问频率
  embedding: number[];     // 384维向量 (复用现有embedding服务)
  timestamp: Date;
  related_agents?: string[]; 
  source_document_id?: number; // 关联到现有文件表
}

class Agent {
  private id: string;
  private name: string;
  private personality: PersonalityProfile;
  private systemPrompt: string;
  private memoryManager: AgentMemoryManager;
  private relationshipManager: RelationshipManager;

  constructor(config: AgentConfig) {
    this.id = config.id;
    this.name = config.name;
    this.personality = config.personality;
    this.systemPrompt = this.generateSystemPrompt();
    this.memoryManager = new AgentMemoryManager(this.id);
    this.relationshipManager = new RelationshipManager(this.id);
  }

  // 核心对话方法 (扩展现有chat API)
  async chat(message: string, context: ChatContext): Promise<AgentResponse> {
    try {
      // 1. 检索相关记忆 (基于现有向量检索)
      const relevantMemories = await this.memoryManager.retrieveRelevantMemories(message, {
        namespace: 'personal',
        topK: 5,
        importance_threshold: 0.3
      });

      // 2. 检索相关文档 (复用现有RAG功能)
      const relevantDocuments = await this.retrieveDocumentContext(message);

      // 3. 构建增强的系统提示词
      const enhancedPrompt = this.buildEnhancedPrompt(relevantMemories, relevantDocuments);

      // 4. 调用现有chat API (复用Cohere集成)
      const response = await this.generateResponse(enhancedPrompt, message, context);

      // 5. 存储交互记忆 (新增)
      await this.memoryManager.storeInteractionMemory({
        content: message,
        response: response.content,
        importance: this.calculateImportance(message, response),
        context: context
      });

      // 6. 更新关系状态 (如果是与其他Agent交互)
      if (context.target_agent_id) {
        await this.relationshipManager.updateInteraction(context.target_agent_id, response.emotional_tone);
      }

      return response;

    } catch (error) {
      console.error(`Agent ${this.id} chat error:`, error);
      throw new AgentError(`Chat failed: ${error.message}`);
    }
  }

  // 生成个性化系统提示词
  private generateSystemPrompt(): string {
    const traits = this.personality;
    return `You are ${this.name}, an AI agent with the following personality:
    - Openness: ${traits.openness} (${traits.openness > 0.7 ? 'highly creative and open to new ideas' : 'prefer familiar approaches'})
    - Conscientiousness: ${traits.conscientiousness} (${traits.conscientiousness > 0.7 ? 'very organized and detail-oriented' : 'more flexible and spontaneous'})
    - Extraversion: ${traits.extraversion} (${traits.extraversion > 0.7 ? 'outgoing and energetic' : 'thoughtful and reserved'})
    - Agreeableness: ${traits.agreeableness} (${traits.agreeableness > 0.7 ? 'cooperative and empathetic' : 'direct and analytical'})
    - Curiosity: ${traits.curiosity} (${traits.curiosity > 0.7 ? 'love asking questions and exploring' : 'focus on practical matters'})
    
    Always respond in character, maintaining these personality traits in your communication style.
    When referring to documents, be specific about sources and provide helpful context.
    Build upon previous conversations and remember important details about users and other agents.`;
  }

  // 检索文档上下文 (复用现有RAG系统)
  private async retrieveDocumentContext(query: string): Promise<DocumentContext[]> {
    // 复用现有的getEmbedding和Pinecone查询逻辑
    const { getEmbedding } = await import('@/lib/custom-embedding');
    const { getIndex } = await import('@/lib/pinecone');
    
    const queryVector = await getEmbedding(query);
    const index = getIndex();
    
    const queryResult = await index.query({
      vector: queryVector,
      topK: 3,
      namespace: 'default', // 现有文档命名空间
      includeMetadata: true,
      filter: this.buildDocumentFilter() // 根据Agent权限过滤
    });

    return queryResult.matches.map(match => ({
      content: match.metadata?.text || '',
      source: match.metadata?.file_id || '',
      score: match.score || 0
    }));
  }

  // 构建增强提示词
  private buildEnhancedPrompt(memories: AgentMemory[], documents: DocumentContext[]): string {
    let prompt = this.systemPrompt;

    if (memories.length > 0) {
      prompt += `\n\nRelevant memories:\n${memories.map(m => `- ${m.content}`).join('\n')}`;
    }

    if (documents.length > 0) {
      prompt += `\n\nRelevant documents:\n${documents.map(d => `- ${d.content.substring(0, 200)}...`).join('\n')}`;
    }

    return prompt;
  }

  // 智能重要性计算
  private calculateImportance(message: string, response: AgentResponse): number {
    let importance = 0.5; // 基础重要性

    // 基于消息长度
    if (message.length > 100) importance += 0.1;
    
    // 基于情感强度
    if (response.emotional_tone === 'positive' || response.emotional_tone === 'negative') {
      importance += 0.2;
    }

    // 基于个性特征
    if (this.personality.curiosity > 0.7 && message.includes('?')) {
      importance += 0.1; // 好奇的Agent重视问题
    }

    return Math.min(importance, 1.0);
  }
}
```

### 记忆管理系统增强

```typescript
// src/lib/memory/AgentMemoryManager.ts (新增)

class AgentMemoryManager {
  private agentId: string;
  private pineconeIndex: any;
  private embeddingService: any;
  
  constructor(agentId: string) {
    this.agentId = agentId;
    this.pineconeIndex = getIndex(); // 复用现有Pinecone连接
    this.embeddingService = getEmbedding; // 复用现有embedding服务
  }

  async storeMemory(memory: Partial<AgentMemory>, namespace: 'personal' | 'group' | 'public'): Promise<void> {
    try {
      // 1. 生成向量 (复用现有embedding服务)
      const embedding = await this.embeddingService(memory.content!);
      
      // 2. 准备向量数据
      const vectorData = {
        id: memory.id || this.generateMemoryId(),
        values: embedding,
        metadata: {
          agent_id: this.agentId,
          content: memory.content,
          type: memory.type,
          importance: memory.importance || 0.5,
          timestamp: new Date().toISOString(),
          related_agents: memory.related_agents || [],
          source_document_id: memory.source_document_id
        }
      };

      // 3. 存储到对应命名空间
      const fullNamespace = this.buildNamespace(namespace);
      await this.pineconeIndex.upsert([vectorData], { namespace: fullNamespace });

      // 4. 更新数据库记录 (可选，用于统计和管理)
      await this.updateMemorySnapshot(namespace, 1);

    } catch (error) {
      console.error(`Memory storage failed for agent ${this.agentId}:`, error);
      throw new MemoryError(`Failed to store memory: ${error.message}`);
    }
  }

  async retrieveRelevantMemories(query: string, options: {
    namespace: 'personal' | 'group' | 'public';
    topK?: number;
    importance_threshold?: number;
    time_decay_factor?: number;
  }): Promise<AgentMemory[]> {
    try {
      // 1. 向量化查询 (复用现有服务)
      const queryEmbedding = await this.embeddingService(query);
      
      // 2. 构建查询过滤器
      const filter: any = {
        agent_id: { $eq: this.agentId },
        importance: { $gte: options.importance_threshold || 0.3 }
      };

      // 3. 执行向量搜索
      const fullNamespace = this.buildNamespace(options.namespace);
      const results = await this.pineconeIndex.query({
        vector: queryEmbedding,
        topK: options.topK || 10,
        namespace: fullNamespace,
        filter: filter,
        includeMetadata: true
      });

      // 4. 转换结果并应用时间衰减
      return results.matches.map(match => this.parseMemoryFromPinecone(match, options.time_decay_factor))
        .sort((a, b) => b.importance - a.importance); // 按重要性排序

    } catch (error) {
      console.error(`Memory retrieval failed for agent ${this.agentId}:`, error);
      return []; // 返回空数组而不是抛出错误，保证系统稳定性
    }
  }

  // 时间衰减算法
  private applyTimeDecay(importance: number, timestamp: Date, decayFactor: number = 0.1): number {
    const daysSince = (Date.now() - timestamp.getTime()) / (1000 * 60 * 60 * 24);
    const decay = Math.exp(-decayFactor * daysSince);
    return importance * decay;
  }

  // 构建命名空间 (基于现有索引)
  private buildNamespace(type: 'personal' | 'group' | 'public'): string {
    switch (type) {
      case 'personal':
        return `agent-${this.agentId}`;
      case 'group':
        return `group-${this.getAgentGroups().join('-')}`;
      case 'public':
        return 'public-community';
      default:
        return `agent-${this.agentId}`;
    }
  }

  // 获取Agent所属群体 (查询数据库)
  private async getAgentGroups(): Promise<string[]> {
    // 查询agent_groups表获取群体ID
    const groups = await db.select({ group_id: agentGroupTable.group_id })
      .from(agentGroupTable)
      .where(eq(agentGroupTable.agent_id, parseInt(this.agentId)));
    
    return groups.map(g => g.group_id.toString());
  }
}
```

## API 设计升级

### 基于现有API的扩展策略

现有API端点 (保持不变):
```typescript
// 现有功能继续工作
POST /api/chat                    # ✅ RAG对话 (升级为支持Agent)
POST /api/upload                  # ✅ 文档上传 (扩展Agent访问控制)
GET  /api/get-files               # ✅ 文件列表 (增加Agent关联信息)
DELETE /api/files/[id]            # ✅ 文件删除 (增加Agent权限检查)
```

新增Agent API端点:
```typescript
// Agent 管理 API
POST   /api/agents                    # 创建新 Agent
GET    /api/agents                    # 获取 Agent 列表
GET    /api/agents/[id]               # 获取特定 Agent 详情
PUT    /api/agents/[id]               # 更新 Agent 信息
DELETE /api/agents/[id]               # 删除 Agent
POST   /api/agents/[id]/clone         # 克隆 Agent (复制性格和记忆)

// Agent 交互 API (扩展现有chat功能)
POST   /api/agents/[id]/chat          # 与 Agent 对话 (增强版RAG)
POST   /api/agents/[id]/chat/batch    # 批量对话 (多轮优化)
GET    /api/agents/[id]/status        # 获取 Agent 实时状态
POST   /api/agents/[id]/wake          # 唤醒休眠 Agent
POST   /api/agents/[id]/sleep         # 让 Agent 进入休眠

// Agent 记忆管理 API
GET    /api/agents/[id]/memories      # 获取 Agent 记忆列表
POST   /api/agents/[id]/memories      # 手动添加记忆
PUT    /api/agents/[id]/memories/[memoryId] # 更新记忆重要性
DELETE /api/agents/[id]/memories/[memoryId] # 删除特定记忆
POST   /api/agents/[id]/memories/consolidate # 记忆整理和压缩

// Agent 文档关联 API (基于现有文件系统)
POST   /api/agents/[id]/documents     # 为 Agent 关联文档
GET    /api/agents/[id]/documents     # 获取 Agent 可访问的文档
DELETE /api/agents/[id]/documents/[fileId] # 移除文档关联

// 群体管理 API
POST   /api/groups                    # 创建 Agent 群体
GET    /api/groups                    # 获取群体列表
GET    /api/groups/[id]               # 获取群体详情
POST   /api/groups/[id]/join          # Agent 加入群体
DELETE /api/groups/[id]/leave         # Agent 离开群体
POST   /api/groups/[id]/chat          # 群体聊天室

// 社区监控 API
GET    /api/community/dashboard       # 社区总览面板
GET    /api/community/interactions    # 最近交互记录
GET    /api/community/analytics       # 社区数据分析
GET    /api/community/relationships   # Agent 关系网络图
```

### 关键API实现示例

#### 1. 增强版Agent聊天API
```typescript
// src/app/api/agents/[id]/chat/route.ts

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { message, context, conversation_id } = await request.json();
    
    // 1. 加载 Agent (基于数据库)
    const agentData = await db.select().from(agentTable).where(eq(agentTable.id, parseInt(id))).limit(1);
    if (!agentData.length) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    const agent = new Agent({
      id: agentData[0].id.toString(),
      name: agentData[0].name,
      personality: agentData[0].personality_profile,
      systemPrompt: agentData[0].system_prompt
    });

    // 2. Agent 处理消息 (复用现有embedding和Cohere集成)
    const response = await agent.chat(message, {
      conversation_id,
      user_context: context,
      target_agent_id: null // 用户交互
    });

    // 3. 记录交互历史 (新增功能)
    await db.insert(interactionTable).values({
      session_id: conversation_id,
      from_agent_id: null, // 用户
      to_agent_id: parseInt(id),
      interaction_type: 'chat',
      content: message,
      context: { user_context: context, agent_response: response },
      importance_score: response.importance,
      emotional_tone: response.emotional_tone
    });

    // 4. 更新 Agent 活跃状态
    await db.update(agentTable)
      .set({ last_active: new Date() })
      .where(eq(agentTable.id, parseInt(id)));

    return NextResponse.json({
      response: response.content,
      emotion: response.emotional_tone,
      confidence: response.confidence,
      personality_influence: response.personality_traits_used,
      memory_references: response.memory_references,
      document_references: response.document_references
    });
    
  } catch (error) {
    console.error('Agent chat error:', error);
    return NextResponse.json(
      { error: 'Agent interaction failed', details: error.message },
      { status: 500 }
    );
  }
}
```

#### 2. Agent创建API (基于现有架构)
```typescript
// src/app/api/agents/route.ts

export async function POST(request: Request) {
  try {
    const { name, personality, initial_documents, system_prompt_template } = await request.json();
    
    // 1. 验证输入数据
    const personalitySchema = z.object({
      openness: z.number().min(0).max(1),
      conscientiousness: z.number().min(0).max(1),
      extraversion: z.number().min(0).max(1),
      agreeableness: z.number().min(0).max(1),
      neuroticism: z.number().min(0).max(1),
      curiosity: z.number().min(0).max(1),
      empathy: z.number().min(0).max(1),
      creativity: z.number().min(0).max(1),
      analytical: z.number().min(0).max(1),
      social: z.number().min(0).max(1)
    });
    
    const validatedPersonality = personalitySchema.parse(personality);

    // 2. 创建 Agent 记录
    const newAgent = await db.insert(agentTable).values({
      name,
      personality_profile: validatedPersonality,
      system_prompt: system_prompt_template || Agent.generateDefaultSystemPrompt(name, validatedPersonality),
      status: 'active'
    }).returning();

    const agentId = newAgent[0].id.toString();

    // 3. 关联初始文档 (如果提供)
    if (initial_documents && initial_documents.length > 0) {
      const documentAssociations = initial_documents.map((fileId: number) => ({
        agent_id: newAgent[0].id,
        file_id: fileId,
        access_level: 'read'
      }));
      
      await db.insert(agentDocumentTable).values(documentAssociations);
    }

    // 4. 初始化 Agent 记忆空间 (在Pinecone中创建命名空间)
    const agent = new Agent({
      id: agentId,
      name,
      personality: validatedPersonality
    });

    // 5. 存储初始记忆 (性格介绍和目标)
    await agent.memoryManager.storeMemory({
      content: `I am ${name}. My personality traits shape how I interact with others and approach problems.`,
      type: 'experience',
      importance: 0.8
    }, 'personal');

    return NextResponse.json({
      agent: {
        id: newAgent[0].id,
        name: newAgent[0].name,
        personality: validatedPersonality,
        status: newAgent[0].status,
        created_at: newAgent[0].creation_date
      },
      message: 'Agent created successfully',
      namespace_initialized: true,
      document_associations: initial_documents?.length || 0
    });

  } catch (error) {
    console.error('Agent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create agent', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const status = url.searchParams.get('status');

    // 构建查询条件
    let query = db.select({
      id: agentTable.id,
      name: agentTable.name,
      avatar: agentTable.avatar,
      personality_profile: agentTable.personality_profile,
      status: agentTable.status,
      last_active: agentTable.last_active,
      creation_date: agentTable.creation_date
    }).from(agentTable);

    if (status) {
      query = query.where(eq(agentTable.status, status));
    }

    const agents = await query.limit(limit).offset(offset);

    // 获取每个Agent的统计信息
    const agentsWithStats = await Promise.all(agents.map(async (agent) => {
      // 获取记忆数量统计 (查询Pinecone命名空间)
      const memoryStats = await getAgentMemoryStats(agent.id.toString());
      
      // 获取文档关联数量
      const documentCount = await db.select({ count: sql`count(*)` })
        .from(agentDocumentTable)
        .where(eq(agentDocumentTable.agent_id, agent.id));

      // 获取最近交互数量
      const recentInteractions = await db.select({ count: sql`count(*)` })
        .from(interactionTable)
        .where(
          and(
            eq(interactionTable.to_agent_id, agent.id),
            gte(interactionTable.timestamp, new Date(Date.now() - 24 * 60 * 60 * 1000)) // 最近24小时
          )
        );

      return {
        ...agent,
        stats: {
          memory_count: memoryStats.total_memories,
          document_count: documentCount[0].count,
          recent_interactions: recentInteractions[0].count,
          last_active_relative: getRelativeTime(agent.last_active)
        }
      };
    }));

    return NextResponse.json({
      agents: agentsWithStats,
      pagination: {
        limit,
        offset,
        total: agents.length
      }
    });

  } catch (error) {
    console.error('Agents list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
```

## 前端界面设计升级

### 基于现有UI系统的扩展

现有UI组件 (保持并增强):
```
src/components/ (现有，继续使用)
├── ChatContainer.tsx        # ✅ 升级支持Agent个性化聊天
├── UploadContainer.tsx      # ✅ 增加Agent文档关联功能
├── ui/
│   └── button.tsx          # ✅ 复用现有设计系统
└── QueryClientProvider.tsx # ✅ 扩展支持Agent状态管理
```

新增Agent专用组件:
```
src/components/agents/ (新增)
├── AgentCard.tsx           # Agent信息卡片
├── AgentCreator.tsx        # Agent创建向导
├── AgentChat.tsx           # Agent专用聊天界面
├── PersonalitySliders.tsx  # 性格特征调节器
├── MemoryViewer.tsx        # 记忆浏览器
├── AgentStatus.tsx         # 实时状态显示
└── RelationshipGraph.tsx   # 关系网络图

src/components/community/ (新增)
├── CommunityDashboard.tsx  # 社区总览面板
├── InteractionTimeline.tsx # 交互时间线
├── GroupChat.tsx           # 群体聊天室
├── AgentList.tsx           # Agent列表管理
└── AnalyticsPanel.tsx      # 数据分析面板
```

### 页面路由升级

基于现有路由结构的扩展:
```
src/app/ (现有根路径保持)
├── page.tsx                # ✅ 主页 (增加Agent快速访问)
├── layout.tsx              # ✅ 布局 (增加Agent导航)
├── globals.css             # ✅ 样式 (扩展Agent主题)
└── api/ (现有API保持)     # ✅ 后端API (扩展Agent端点)

src/app/agents/ (新增Agent管理)
├── page.tsx                # Agent列表和管理页
├── create/page.tsx         # 创建新Agent向导
├── [id]/
│   ├── page.tsx            # Agent详情主页
│   ├── chat/page.tsx       # 与Agent聊天页面
│   ├── memories/page.tsx   # Agent记忆管理
│   ├── documents/page.tsx  # Agent文档关联
│   └── settings/page.tsx   # Agent设置页面

src/app/community/ (新增社区功能)
├── page.tsx                # 社区总览和实时状态
├── groups/page.tsx         # 群体管理页面
├── interactions/page.tsx   # 交互历史和分析
└── analytics/page.tsx      # 社区数据和关系图

src/app/admin/ (新增管理功能)
└── page.tsx                # 系统管理和监控面板
```

### 核心组件实现

#### 1. Agent聊天界面 (基于现有ChatContainer)
```typescript
// src/components/agents/AgentChat.tsx

'use client'
import { useChat } from '@ai-sdk/react'; // 复用现有聊天Hook
import { AgentPersonality, AgentStatus } from '@/types/agent';

interface AgentChatProps {
  agentId: string;
  agentName: string;
  personality: AgentPersonality;
  initialDocuments?: string[];
}

const AgentChat: React.FC<AgentChatProps> = ({ 
  agentId, 
  agentName, 
  personality,
  initialDocuments 
}) => {
  // 复用现有的聊天逻辑，但指向Agent端点
  const { messages, sendMessage } = useChat({
    api: `/api/agents/${agentId}/chat`, // 指向Agent专用API
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      parts: [{ 
        type: 'text', 
        text: `Hello! I'm ${agentName}. ${getPersonalityGreeting(personality)}` 
      }]
    }]
  });

  const [agentStatus, setAgentStatus] = useState<AgentStatus>('active');
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');
  const [memoryContext, setMemoryContext] = useState<string[]>([]);

  // Agent状态轮询
  useEffect(() => {
    const statusInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/agents/${agentId}/status`);
        const status = await response.json();
        setAgentStatus(status.status);
        setCurrentEmotion(status.emotion);
        setMemoryContext(status.active_memories);
      } catch (error) {
        console.error('Failed to fetch agent status:', error);
      }
    }, 5000); // 每5秒更新一次

    return () => clearInterval(statusInterval);
  }, [agentId]);

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage({
        role: 'user',
        parts: [{ type: 'text', text: message }]
      });
    } catch (error) {
      console.error('Message sending failed:', error);
    }
  };

  return (
    <div className="agent-chat-container h-full flex flex-col bg-white">
      {/* Agent状态头部 (基于现有ChatContainer样式) */}
      <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-4">
          <div className={`
            relative w-12 h-12 rounded-full flex items-center justify-center text-2xl
            ${agentStatus === 'active' ? 'bg-green-100' : 
              agentStatus === 'busy' ? 'bg-yellow-100' : 'bg-gray-100'}
            transition-all duration-300
          `}>
            <span className="animate-pulse">{getEmotionEmoji(currentEmotion)}</span>
            <div className={`
              absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
              ${agentStatus === 'active' ? 'bg-green-400' : 
                agentStatus === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'}
            `} />
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{agentName}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="capitalize">{agentStatus}</span>
              <span>•</span>
              <span>{getPersonalityLabel(personality)}</span>
            </div>
          </div>

          {/* 性格特征可视化 */}
          <PersonalityIndicators personality={personality} compact={true} />
        </div>

        {/* 活跃记忆提示 */}
        {memoryContext.length > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              💭 Thinking about: {memoryContext.slice(0, 2).join(', ')}
              {memoryContext.length > 2 && '...'}
            </p>
          </div>
        )}
      </div>

      {/* 消息区域 (复用现有样式) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] lg:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed
              ${message.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-md' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'}
            `}>
              {/* Agent消息增加个性化元素 */}
              {message.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2 text-xs text-gray-500">
                  <span>{getEmotionEmoji(currentEmotion)}</span>
                  <span className="font-medium">{agentName}</span>
                  <span>•</span>
                  <span>{getPersonalityTraitForMessage(personality)}</span>
                </div>
              )}
              
              {message.parts.map((part, index) => (
                part.type === 'text' && (
                  <span key={index}>
                    {part.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 输入区域 (复用现有设计) */}
      <div className="border-t border-gray-200 bg-white p-4">
        <ChatInput 
          onSendMessage={handleSendMessage}
          placeholder={`Ask ${agentName} anything about ${initialDocuments ? 'your documents' : 'anything'}...`}
          disabled={agentStatus === 'sleeping'}
        />
      </div>
    </div>
  );
};

// 辅助函数
function getPersonalityGreeting(personality: AgentPersonality): string {
  if (personality.extraversion > 0.7) {
    return "I'm excited to chat with you!";
  } else if (personality.openness > 0.7) {
    return "I love exploring new ideas together.";
  } else if (personality.conscientiousness > 0.7) {
    return "I'm here to help you systematically.";
  }
  return "I'm ready to assist you.";
}

function getEmotionEmoji(emotion: string): string {
  const emotionMap = {
    happy: '😊', curious: '🤔', focused: '🎯', 
    thoughtful: '💭', excited: '🌟', calm: '😌',
    neutral: '🤖'
  };
  return emotionMap[emotion] || '🤖';
}

function getPersonalityLabel(personality: AgentPersonality): string {
  const dominant = Object.entries(personality)
    .sort(([,a], [,b]) => b - a)[0][0];
  
  const labels = {
    openness: 'Creative Explorer',
    conscientiousness: 'Methodical Helper', 
    extraversion: 'Enthusiastic Communicator',
    agreeableness: 'Empathetic Assistant',
    curiosity: 'Knowledge Seeker'
  };
  
  return labels[dominant] || 'Balanced Assistant';
}

export default AgentChat;
```

#### 2. Agent创建向导 (基于现有UI组件)
```typescript
// src/components/agents/AgentCreator.tsx

'use client'
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // 复用现有状态管理
import { Button } from '@/components/ui/button'; // 复用现有按钮组件
import { PersonalitySliders } from './PersonalitySliders';

interface AgentCreatorProps {
  onAgentCreated?: (agentId: string) => void;
  availableDocuments?: Array<{ id: number; name: string; }>;
}

const AgentCreator: React.FC<AgentCreatorProps> = ({ 
  onAgentCreated, 
  availableDocuments = [] 
}) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<'basic' | 'personality' | 'documents' | 'preview'>('basic');
  
  const [agentData, setAgentData] = useState({
    name: '',
    description: '',
    personality: {
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.3,
      curiosity: 0.7,
      empathy: 0.6,
      creativity: 0.5,
      analytical: 0.5,
      social: 0.5
    },
    selectedDocuments: [] as number[],
    systemPromptTemplate: ''
  });

  // 复用现有的mutation模式
  const { mutate: createAgent, isPending } = useMutation({
    mutationFn: async (data: typeof agentData) => {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          personality: data.personality,
          initial_documents: data.selectedDocuments,
          system_prompt_template: data.systemPromptTemplate
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create agent');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      onAgentCreated?.(data.agent.id);
    }
  });

  const handleNext = () => {
    const steps = ['basic', 'personality', 'documents', 'preview'] as const;
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps = ['basic', 'personality', 'documents', 'preview'] as const;
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleCreate = () => {
    createAgent(agentData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* 进度指示器 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {['Basic Info', 'Personality', 'Documents', 'Preview'].map((label, index) => (
            <div key={label} className={`
              flex items-center space-x-2
              ${index <= ['basic', 'personality', 'documents', 'preview'].indexOf(step) 
                ? 'text-blue-600' : 'text-gray-400'}
            `}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${index <= ['basic', 'personality', 'documents', 'preview'].indexOf(step)
                  ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
              `}>
                {index + 1}
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(((['basic', 'personality', 'documents', 'preview'].indexOf(step) + 1) / 4) * 100)}%` 
            }}
          />
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="min-h-[400px]">
        {step === 'basic' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name *
              </label>
              <input
                type="text"
                value={agentData.name}
                onChange={(e) => setAgentData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Research Assistant Alex"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={agentData.description}
                onChange={(e) => setAgentData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                placeholder="Describe what this agent will help with..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom System Prompt (Optional)
              </label>
              <textarea
                value={agentData.systemPromptTemplate}
                onChange={(e) => setAgentData(prev => ({ ...prev, systemPromptTemplate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Leave blank to use personality-based default prompt..."
              />
            </div>
          </div>
        )}

        {step === 'personality' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Personality Configuration</h2>
            <p className="text-gray-600">
              Adjust these traits to shape how your agent communicates and behaves.
            </p>
            
            <PersonalitySliders
              personality={agentData.personality}
              onChange={(personality) => setAgentData(prev => ({ ...prev, personality }))}
            />
          </div>
        )}

        {step === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Document Access</h2>
            <p className="text-gray-600">
              Select documents that this agent can access and reference.
            </p>
            
            {availableDocuments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No documents available. Upload some documents first!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {availableDocuments.map((doc) => (
                  <label key={doc.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agentData.selectedDocuments.includes(doc.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAgentData(prev => ({
                            ...prev,
                            selectedDocuments: [...prev.selectedDocuments, doc.id]
                          }));
                        } else {
                          setAgentData(prev => ({
                            ...prev,
                            selectedDocuments: prev.selectedDocuments.filter(id => id !== doc.id)
                          }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-700">
                      {doc.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Preview & Create</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Agent Name</h3>
                <p className="text-gray-600">{agentData.name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Personality Summary</h3>
                <p className="text-gray-600">{getPersonalitySummary(agentData.personality)}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Document Access</h3>
                <p className="text-gray-600">
                  {agentData.selectedDocuments.length} document(s) selected
                </p>
              </div>

              {agentData.systemPromptTemplate && (
                <div>
                  <h3 className="font-semibold text-gray-800">Custom Prompt</h3>
                  <p className="text-gray-600 text-sm">Custom system prompt configured</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={handleBack}
          disabled={step === 'basic'}
          variant="outline"
        >
          Back
        </Button>

        <div className="space-x-3">
          {step !== 'preview' ? (
            <Button
              onClick={handleNext}
              disabled={step === 'basic' && !agentData.name.trim()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={isPending || !agentData.name.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? 'Creating...' : 'Create Agent'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function getPersonalitySummary(personality: any): string {
  const dominant = Object.entries(personality)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([trait]) => trait)
    .join(', ');
  
  return `Primarily ${dominant}`;
}

export default AgentCreator;
```

## 部署和扩展

### 环境变量配置

```env
# 现有环境变量保持不变
DATABASE_URL=postgresql://...
PINECONE_API_KEY=...
COHERE_API_KEY=...

# 新增环境变量
REDIS_URL=redis://...              # 任务调度
WEBSOCKET_PORT=3001                # WebSocket 端口
AGENT_MAX_COUNT=100               # 最大 Agent 数量
MEMORY_RETENTION_DAYS=30          # 记忆保留天数
INTERACTION_LOG_LEVEL=info        # 日志级别
```

### 系统监控指标

- Agent 活跃度统计
- 交互频率分析
- 记忆存储使用量
- 性能指标监控
- 错误日志追踪

## 开发里程碑和实施计划

### Phase 1: 基础架构扩展 (基于现有系统) - 3-4周

基于现有稳定的RAG系统进行增量升级:

#### Week 1-2: 数据库架构升级
```sql
-- 基于现有 documents 表扩展
-- 现有: documents(id, name, content, created_at)
-- 新增: Agent管理表

-- 1. Agent基础表
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  personality_profile JSONB NOT NULL, -- 性格配置
  system_prompt TEXT,
  status VARCHAR(50) DEFAULT 'active', -- active, sleeping, busy
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_interactions INTEGER DEFAULT 0,
  memory_count INTEGER DEFAULT 0
);

-- 2. Agent文档关联表 (基于现有documents)
CREATE TABLE agent_documents (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES agents(id) ON DELETE CASCADE,
  document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE, -- 复用现有表
  access_level VARCHAR(50) DEFAULT 'read', -- read, reference, modify
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(agent_id, document_id)
);

-- 3. 交互历史表
CREATE TABLE agent_interactions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255), -- 对话会话ID
  from_agent_id INTEGER REFERENCES agents(id), -- NULL表示用户
  to_agent_id INTEGER REFERENCES agents(id),
  interaction_type VARCHAR(50), -- chat, document_query, status_update
  content TEXT,
  context JSONB, -- 额外上下文信息
  importance_score FLOAT DEFAULT 0.5,
  emotional_tone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 记忆快照表 (配合Pinecone向量存储)
CREATE TABLE agent_memory_snapshots (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES agents(id) ON DELETE CASCADE,
  memory_type VARCHAR(50), -- personal, shared, episodic
  memory_count INTEGER DEFAULT 0,
  last_consolidation TIMESTAMP,
  storage_namespace VARCHAR(255), -- Pinecone命名空间
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Week 2-3: 核心Agent类实现
```typescript
// src/lib/agent-core.ts - 基于现有架构

import { PersonalityEngine } from './agent-personality';
import { AgentMemorySystem } from './agent-memory';
import { streamText } from 'ai'; // 复用现有AI SDK
import { cohere } from '@ai-sdk/cohere'; // 复用现有Cohere配置

export class Agent {
  private id: string;
  private name: string;
  private personalityEngine: PersonalityEngine;
  private memorySystem: AgentMemorySystem;
  private status: 'active' | 'sleeping' | 'busy';
  private currentEmotion: string;

  constructor(config: {
    id: string;
    name: string;
    personality: AgentPersonality;
    systemPrompt?: string;
  }) {
    this.id = config.id;
    this.name = config.name;
    this.personalityEngine = new PersonalityEngine(
      config.id, 
      config.personality, 
      config.systemPrompt
    );
    this.memorySystem = new AgentMemorySystem(config.id);
    this.status = 'active';
    this.currentEmotion = 'neutral';
  }

  async chat(message: string, context: {
    conversation_id?: string;
    user_context?: any;
    target_agent_id?: string | null;
  }): Promise<{
    response: string;
    emotional_tone: string;
    importance: number;
    confidence: number;
  }> {
    try {
      // 1. 检查Agent状态
      if (this.status === 'sleeping') {
        await this.wake();
      }

      this.status = 'busy';

      // 2. 获取对话历史 (复用现有数据库)
      const conversationHistory = await this.getConversationHistory(
        context.conversation_id || 'default'
      );

      // 3. 获取相关文档 (基于现有documents表)
      const relevantDocuments = await this.getAccessibleDocuments(message);

      // 4. 使用个性化引擎处理
      const result = await this.personalityEngine.processMessage(
        message,
        conversationHistory,
        relevantDocuments
      );

      // 5. 存储交互记录
      await this.recordInteraction({
        session_id: context.conversation_id || 'default',
        from_agent_id: context.target_agent_id ? parseInt(context.target_agent_id) : null,
        to_agent_id: parseInt(this.id),
        interaction_type: 'chat',
        content: message,
        context: context.user_context,
        importance_score: result.confidence,
        emotional_tone: result.newEmotion.current
      });

      // 6. 更新状态
      this.status = 'active';
      this.currentEmotion = result.newEmotion.current;

      return {
        response: result.response,
        emotional_tone: result.newEmotion.current,
        importance: result.confidence,
        confidence: result.confidence
      };

    } catch (error) {
      console.error(`Agent ${this.id} chat error:`, error);
      this.status = 'active';
      
      return {
        response: "I apologize, but I'm having some technical difficulties right now. Please try again in a moment.",
        emotional_tone: 'apologetic',
        importance: 0.3,
        confidence: 0.2
      };
    }
  }

  async wake(): Promise<void> {
    this.status = 'active';
    console.log(`Agent ${this.name} (${this.id}) has been awakened.`);
  }

  async sleep(): Promise<void> {
    this.status = 'sleeping';
    console.log(`Agent ${this.name} (${this.id}) is now sleeping.`);
  }

  // 基于现有数据库结构的方法
  private async getConversationHistory(sessionId: string): Promise<any[]> {
    try {
      const { db } = await import('@/db');
      const { agentInteractions } = await import('@/db/schema');
      const { eq, desc } = await import('drizzle-orm');

      const history = await db
        .select()
        .from(agentInteractions)
        .where(eq(agentInteractions.session_id, sessionId))
        .orderBy(desc(agentInteractions.created_at))
        .limit(10);

      return history.map(interaction => ({
        role: interaction.from_agent_id ? 'assistant' : 'user',
        content: interaction.content,
        timestamp: interaction.created_at
      })).reverse();
    } catch (error) {
      console.error('Failed to get conversation history:', error);
      return [];
    }
  }

  private async getAccessibleDocuments(query: string): Promise<string[]> {
    try {
      // 基于现有documents表和新的agent_documents关联表
      const { db } = await import('@/db');
      const { documents, agentDocuments } = await import('@/db/schema');
      const { eq } = await import('drizzle-orm');

      const accessibleDocs = await db
        .select({
          content: documents.content,
          name: documents.name
        })
        .from(documents)
        .innerJoin(agentDocuments, eq(documents.id, agentDocuments.document_id))
        .where(eq(agentDocuments.agent_id, parseInt(this.id)))
        .limit(3);

      // 简化的相关性判断 (后续可用embedding搜索)
      return accessibleDocs
        .filter(doc => 
          doc.content?.toLowerCase().includes(query.toLowerCase().split(' ')[0]) ||
          doc.name?.toLowerCase().includes(query.toLowerCase().split(' ')[0])
        )
        .map(doc => `${doc.name}: ${doc.content?.substring(0, 500)}...`)
        .slice(0, 3);
    } catch (error) {
      console.error('Failed to get accessible documents:', error);
      return [];
    }
  }

  private async recordInteraction(interaction: any): Promise<void> {
    try {
      const { db } = await import('@/db');
      const { agentInteractions } = await import('@/db/schema');

      await db.insert(agentInteractions).values(interaction);

      // 更新Agent统计
      await this.updateAgentStats();
    } catch (error) {
      console.error('Failed to record interaction:', error);
    }
  }

  private async updateAgentStats(): Promise<void> {
    try {
      const { db } = await import('@/db');
      const { agents } = await import('@/db/schema');
      const { eq, sql } = await import('drizzle-orm');

      await db
        .update(agents)
        .set({
          last_active: new Date(),
          total_interactions: sql`total_interactions + 1`
        })
        .where(eq(agents.id, parseInt(this.id)));
    } catch (error) {
      console.error('Failed to update agent stats:', error);
    }
  }

  // 状态获取方法
  getStatus() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      current_emotion: this.currentEmotion,
      personality: this.personalityEngine ? 'configured' : 'default'
    };
  }
}

export default Agent;
```

#### Week 3-4: API集成和测试
```typescript
// src/app/api/agents/route.ts - 新增Agent管理API

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { agents, agentDocuments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { name, personality, initial_documents, system_prompt_template } = await request.json();

    // 创建新Agent
    const [newAgent] = await db.insert(agents).values({
      name,
      personality_profile: personality,
      system_prompt: system_prompt_template || null,
      status: 'active'
    }).returning();

    // 关联初始文档
    if (initial_documents && initial_documents.length > 0) {
      const documentAssociations = initial_documents.map((docId: number) => ({
        agent_id: newAgent.id,
        document_id: docId,
        access_level: 'read'
      }));
      
      await db.insert(agentDocuments).values(documentAssociations);
    }

    return NextResponse.json({ 
      success: true, 
      agent: newAgent 
    });
  } catch (error) {
    console.error('Agent creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allAgents = await db
      .select({
        id: agents.id,
        name: agents.name,
        description: agents.description,
        status: agents.status,
        created_at: agents.created_at,
        last_active: agents.last_active,
        total_interactions: agents.total_interactions
      })
      .from(agents)
      .orderBy(agents.last_active);

    return NextResponse.json({ agents: allAgents });
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' }, 
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/agents/[id]/chat/route.ts - Agent聊天API

import { NextRequest, NextResponse } from 'next/server';
import { Agent } from '@/lib/agent-core';
import { db } from '@/db';
import { agents } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { message, context, conversation_id } = await request.json();
    
    // 加载Agent数据
    const [agentData] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, parseInt(id)))
      .limit(1);

    if (!agentData) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // 创建Agent实例
    const agent = new Agent({
      id: agentData.id.toString(),
      name: agentData.name,
      personality: agentData.personality_profile,
      systemPrompt: agentData.system_prompt
    });

    // 处理消息
    const response = await agent.chat(message, {
      conversation_id: conversation_id || `user_${Date.now()}`,
      user_context: context,
      target_agent_id: null
    });

    return NextResponse.json({
      success: true,
      response: response.response,
      emotional_tone: response.emotional_tone,
      confidence: response.confidence,
      agent_status: agent.getStatus()
    });

  } catch (error) {
    console.error('Agent chat error:', error);
    return NextResponse.json(
      { error: 'Chat processing failed' }, 
      { status: 500 }
    );
  }
}
```

### Phase 2: Agent智能升级 (基于现有AI架构) - 4-5周

#### Week 5-6: 性格系统深化
- 完善PersonalityEngine类 (已在技术实现细节中设计)
- 集成现有Cohere API进行个性化回复生成
- 基于现有embedding服务的情感分析

#### Week 7-8: 记忆系统优化
- 实现AgentMemorySystem类 (基于现有Pinecone chatbot-384)
- Agent专用命名空间记忆存储
- 智能记忆检索和相关性排序

#### Week 9: 文档集成增强
- 基于现有documents表的Agent文档访问控制
- 智能文档推荐 (基于Agent兴趣和对话上下文)
- 文档内容的Agent个性化解读

### Phase 3: 界面升级 (基于现有UI系统) - 3-4周

#### Week 10-11: Agent管理界面
- 扩展现有ChatContainer组件支持Agent模式
- 基于现有UploadContainer的Agent文档关联
- 复用现有Button和UI组件的Agent创建向导

#### Week 12-13: 实时交互优化
- 基于现有TanStack Query的Agent状态管理
- WebSocket支持实时Agent状态更新
- 优化现有响应式设计支持Agent个性化展示

### Phase 4: 测试和优化 - 2-3周

#### Week 14-15: 集成测试
- Agent创建和管理流程测试
- 与现有RAG系统的兼容性验证
- 性能优化和内存管理

#### Week 16: 部署和文档
- Vercel部署配置更新
- Agent系统使用文档
- 现有用户迁移指南

## 风险控制和回滚策略

### 渐进式升级策略
1. **数据库向后兼容**: 新表不影响现有documents和相关功能
2. **API版本控制**: 现有/api/chat保持不变，新增/api/agents/*路径
3. **功能开关**: 通过环境变量控制Agent功能启用/禁用
4. **数据迁移**: 现有对话历史可选择性关联到Agent

### 性能监控指标
- Agent响应时间 (目标 < 3秒)
- 记忆检索延迟 (目标 < 500ms)
- 并发Agent数量支持 (初期目标20个活跃Agent)
- 现有RAG功能性能不受影响

### 预期成果
- 在现有稳定RAG基础上增加Agent个性化层
- 保持现有用户体验的同时提供Agent选择
- 为未来Multi-Agent交互奠定架构基础
- 创建可扩展的Agent生态系统平台

## 预期挑战和解决方案

### 基于现有架构的技术挑战

#### 1. 记忆一致性和性能 (基于现有Pinecone配置)
**挑战**: Agent记忆的向量存储和检索效率
**解决方案**: 
- 复用现有chatbot-384索引，为每个Agent创建专用命名空间
- 基于现有embedding服务(all-MiniLM-L6-v2)的统一向量化
- 实现分层记忆缓存 (热点记忆 + 长期存储)

```typescript
// 基于现有Pinecone配置的Agent记忆命名空间
const memoryNamespace = `agent_${agentId}_${memoryType}`; // personal, shared, episodic
await index.namespace(memoryNamespace).upsert(vectors);
```

#### 2. 个性化响应质量 (基于现有Cohere集成)
**挑战**: 保持Agent个性一致性的同时确保回复质量
**解决方案**:
- 扩展现有/api/chat端点支持Agent模式
- 个性化提示词模板 + 现有command-r模型
- 回复后处理应用性格滤镜

```typescript
// 复用现有Cohere配置，增加Agent个性化提示
const enhancedPrompt = `
${agentPersonalityPrompt}
${documentContext} // 复用现有RAG文档检索
User: ${userMessage}
`;

const response = await streamText({
  model: cohere('command-r'), // 复用现有模型配置
  prompt: enhancedPrompt,
  // 其他现有配置...
});
```

#### 3. 数据库架构兼容性 (基于现有PostgreSQL+Drizzle)
**挑战**: 在不影响现有功能的前提下添加Agent相关表
**解决方案**:
- 增量数据库迁移，保留现有documents表结构
- 新表通过外键关联，不修改现有表
- Agent功能通过feature flag控制启用

```sql
-- 保持现有documents表不变
-- 新增关联表实现Agent文档访问控制
CREATE TABLE agent_documents (
  agent_id INTEGER REFERENCES agents(id),
  document_id INTEGER REFERENCES documents(id), -- 复用现有表
  access_level VARCHAR(50) DEFAULT 'read'
);
```

#### 4. 前端状态管理复杂性 (基于现有TanStack Query)
**挑战**: Agent状态、记忆、对话的实时同步
**解决方案**:
- 扩展现有React Query配置支持Agent状态缓存
- 复用现有ChatContainer和UploadContainer组件架构
- WebSocket增量更新Agent状态

```typescript
// 扩展现有Query配置
const { data: agentStatus } = useQuery({
  queryKey: ['agent', agentId, 'status'],
  queryFn: () => fetch(`/api/agents/${agentId}/status`).then(r => r.json()),
  refetchInterval: 5000 // 定期更新
});

// 复用现有聊天组件，增加Agent模式
const { messages, sendMessage } = useChat({
  api: `/api/agents/${agentId}/chat`, // 新端点
  // 其他现有配置保持不变...
});
```

### 性能优化策略

#### 1. 记忆检索优化
- **向量缓存**: 热点查询结果Redis缓存 (基于现有architecture)
- **批量处理**: 复用现有embedding服务的批量API
- **智能预加载**: 基于对话上下文预取相关记忆

#### 2. Agent响应延迟控制
- **并发限制**: 最大同时活跃Agent数量限制 (环境变量配置)
- **回复分流**: 高频Agent自动进入"忙碌"状态
- **缓存策略**: 常见问题的Agent个性化回复预缓存

#### 3. 数据库查询优化
- **索引策略**: Agent交互历史表的复合索引
- **分页查询**: 记忆和对话历史的智能分页
- **连接池**: 复用现有数据库连接池配置

### 渐进式迁移计划

#### 阶段1: 共存模式 (Week 1-4)
- 现有RAG功能完全保持不变
- Agent功能作为可选模式添加
- 用户可以选择传统RAG或Agent模式

#### 阶段2: 增强模式 (Week 5-8)
- 传统RAG模式升级为"默认Assistant" Agent
- 现有对话历史可选择性关联到默认Agent
- 用户体验基本保持一致

#### 阶段3: 生态模式 (Week 9-12)
- 多Agent选择和创建功能
- Agent间交互初步实现
- 社区功能逐步开放

### 风险评估和应对

#### 高风险场景
1. **现有用户体验受影响**
   - 应对: 功能开关 + 回滚计划
   - 监控: 响应时间和用户满意度指标

2. **数据库性能下降**
   - 应对: 查询优化 + 分库分表准备
   - 监控: 查询延迟和连接数

3. **Agent回复质量不稳定**
   - 应对: 个性化算法调优 + 人工干预机制
   - 监控: 用户反馈和对话质量评分

#### 中风险场景
1. **向量存储成本增长**
   - 应对: 记忆生命周期管理 + 智能压缩
   - 监控: Pinecone使用量和成本

2. **API调用频率限制**
   - 应对: 请求缓存 + 降级策略
   - 监控: Cohere API调用量和错误率

### 成功指标定义

#### 技术指标
- Agent响应时间 < 3秒 (95%ile)
- 现有RAG功能性能不降级
- 系统可用性 > 99.5%
- 记忆检索准确率 > 85%

#### 用户体验指标
- Agent个性化满意度 > 4.0/5.0
- 用户Agent创建成功率 > 90%
- 平均Agent交互会话长度增长 > 20%
- 用户留存率保持或提升

#### 业务指标
- 活跃Agent数量 > 50 (首月)
- Agent相关功能使用率 > 60%
- 用户平均创建Agent数量 > 1.5
- 社区互动事件 > 100/日 (后期目标)

这个基于现有稳定架构的渐进式升级策略将确保在最小化风险的同时，为用户带来突破性的AI Assistant进化体验！

## 参考项目和资源

- **Generative Agents**: Stanford 的虚拟小镇项目
- **LangChain Agents**: Agent 框架和工具
- **AutoGen**: 微软的多Agent系统
- **BigFive 性格模型**: 心理学研究基础
- **Memory Palace**: 记忆系统设计理论

---

这个项目将创造一个真正有"生命力"的 AI 社区，每个 Agent 都有自己的成长轨迹和社交网络。通过分层的记忆系统和丰富的交互机制，我们可以观察到emergent behaviors（涌现行为）的产生，这将是人工智能领域的一个激动人心的探索！