# Multi-Agent Community 开发文档

## 项目概述

本项目将现有的 RAG PDF 聊天机器人升级为一个自主的多Agent社区系统。每个Agent都拥有独特的性格、记忆系统和社交能力，能够在分层的命名空间架构中存储和共享不同类型的信息。

### 核心理念

- **个体性**：每个Agent拥有独特的性格、记忆和目标
- **社交性**：Agent之间可以交流、合作和形成关系
- **分层记忆**：个人记忆、群体记忆、公共记忆的三层架构
- **自主进化**：基于交互和经历动态更新记忆和行为

## 系统架构

### 分层命名空间设计

```
Pinecone 命名空间结构：
├── agent-{agentId}              # 个人命名空间
│   ├── memories-short-term      # 短期记忆
│   ├── memories-long-term       # 长期记忆
│   ├── personality             # 性格特征
│   ├── personal-info           # 个人信息
│   ├── goals-short             # 短期计划
│   ├── goals-medium            # 中期计划
│   └── goals-long              # 长期计划
├── group-{groupId}              # 群体命名空间
│   ├── shared-knowledge        # 共享知识
│   ├── group-dynamics          # 群体动态
│   ├── shared-resources        # 共享资源
│   └── collective-goals        # 集体目标
└── public-common                # 公共命名空间
    ├── world-knowledge         # 世界知识
    ├── time-weather            # 时间天气
    ├── public-facilities       # 公共设施
    └── universal-facts         # 通用事实
```

## 技术栈升级

### 新增技术组件

- **Agent 框架**: LangChain Agents + Custom Agent Architecture
- **记忆管理**: Pinecone + 自定义记忆检索算法
- **社交模拟**: 自定义社交交互引擎
- **任务调度**: Redis + Cron Jobs
- **事件系统**: WebSocket + Event Emitter
- **性格建模**: BigFive 性格模型 + 自定义特征

### 现有技术保持

- **框架**: Next.js + TypeScript
- **数据库**: PostgreSQL + Drizzle ORM
- **向量数据库**: Pinecone
- **AI模型**: Cohere + 自定义嵌入模型

## 数据库设计

### 新增表结构

```typescript
// src/db/schema.ts

// Agent 基本信息表
export const agentTable = pgTable("agents", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  avatar: varchar('avatar', { length: 255 }),
  personality_profile: jsonb('personality_profile').notNull(), // BigFive + 自定义特征
  creation_date: timestamp('creation_date').defaultNow(),
  last_active: timestamp('last_active').defaultNow(),
  status: varchar('status', { length: 20 }).default('active'), // active, sleeping, busy
});

// Agent 群体关系表
export const groupTable = pgTable("groups", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // family, profession, hobby, location
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
});

// Agent-群体关联表
export const agentGroupTable = pgTable("agent_groups", {
  id: serial('id').primaryKey(),
  agent_id: integer('agent_id').references(() => agentTable.id),
  group_id: integer('group_id').references(() => groupTable.id),
  role: varchar('role', { length: 50 }), // member, leader, observer
  joined_at: timestamp('joined_at').defaultNow(),
});

// 交互记录表
export const interactionTable = pgTable("interactions", {
  id: serial('id').primaryKey(),
  from_agent_id: integer('from_agent_id').references(() => agentTable.id),
  to_agent_id: integer('to_agent_id').references(() => agentTable.id),
  interaction_type: varchar('interaction_type', { length: 50 }).notNull(), // chat, action, observation
  content: text('content').notNull(),
  context: jsonb('context'), // 交互上下文
  timestamp: timestamp('timestamp').defaultNow(),
  importance_score: real('importance_score').default(0.5), // 0-1 重要性评分
});

// 事件记录表
export const eventTable = pgTable("events", {
  id: serial('id').primaryKey(),
  event_type: varchar('event_type', { length: 50 }).notNull(),
  description: text('description').notNull(),
  participants: jsonb('participants'), // agent IDs 数组
  location: varchar('location', { length: 100 }),
  timestamp: timestamp('timestamp').defaultNow(),
  impact_score: real('impact_score').default(0.5),
});
```

## 核心类设计

### Agent 类架构

```typescript
// src/lib/agent/Agent.ts

interface PersonalityProfile {
  // BigFive 性格模型
  openness: number;        // 开放性 (0-1)
  conscientiousness: number; // 尽责性
  extraversion: number;    // 外向性
  agreeableness: number;   // 宜人性
  neuroticism: number;     // 神经质
  
  // 自定义特征
  curiosity: number;       // 好奇心
  empathy: number;         // 同理心
  ambition: number;        // 雄心
  creativity: number;      // 创造力
}

interface Memory {
  id: string;
  content: string;
  type: 'experience' | 'knowledge' | 'emotion' | 'relationship';
  importance: number;      // 0-1
  recency: number;         // 0-1, 基于时间衰减
  frequency: number;       // 访问频率
  embedding: number[];     // 向量嵌入
  timestamp: Date;
  related_agents?: string[]; // 相关的其他 agent
}

class Agent {
  private id: string;
  private name: string;
  private personality: PersonalityProfile;
  private currentGoals: Goal[];
  private relationships: Map<string, Relationship>;
  private memoryManager: MemoryManager;

  constructor(id: string, name: string, personality: PersonalityProfile) {
    this.id = id;
    this.name = name;
    this.personality = personality;
    this.memoryManager = new MemoryManager(id);
  }

  // 核心方法
  async perceive(environment: Environment): Promise<Perception[]> {
    // 感知周围环境和其他 agent
  }

  async think(perceptions: Perception[]): Promise<Decision> {
    // 基于感知、记忆和性格做出决策
  }

  async act(decision: Decision): Promise<Action> {
    // 执行决策产生的行动
  }

  async reflect(): Promise<void> {
    // 反思和更新记忆、目标
  }

  async interact(targetAgent: Agent, message: string): Promise<InteractionResult> {
    // 与其他 agent 交互
  }
}
```

### 记忆管理系统

```typescript
// src/lib/memory/MemoryManager.ts

class MemoryManager {
  private agentId: string;
  private pineconeIndex: any;
  
  constructor(agentId: string) {
    this.agentId = agentId;
    this.pineconeIndex = pc.index('chatbot');
  }

  async storeMemory(memory: Memory, namespace: 'personal' | 'group' | 'public'): Promise<void> {
    const fullNamespace = this.buildNamespace(namespace);
    
    await this.pineconeIndex.upsert([{
      id: memory.id,
      values: memory.embedding,
      metadata: {
        content: memory.content,
        type: memory.type,
        importance: memory.importance,
        timestamp: memory.timestamp.toISOString(),
        agent_id: this.agentId,
        related_agents: memory.related_agents
      }
    }], { namespace: fullNamespace });
  }

  async retrieveRelevantMemories(query: string, options: {
    namespace: 'personal' | 'group' | 'public';
    topK?: number;
    importance_threshold?: number;
  }): Promise<Memory[]> {
    const queryEmbedding = await this.embedText(query);
    const fullNamespace = this.buildNamespace(options.namespace);
    
    const results = await this.pineconeIndex.query({
      vector: queryEmbedding,
      topK: options.topK || 10,
      namespace: fullNamespace,
      filter: {
        importance: { $gte: options.importance_threshold || 0.3 }
      },
      includeMetadata: true
    });

    return results.matches.map(this.parseMemoryFromPinecone);
  }

  async updateMemoryImportance(memoryId: string, newImportance: number): Promise<void> {
    // 更新记忆的重要性分数
  }

  private buildNamespace(type: 'personal' | 'group' | 'public'): string {
    switch (type) {
      case 'personal':
        return `agent-${this.agentId}`;
      case 'group':
        return `group-${this.getAgentGroups().join('-')}`;
      case 'public':
        return 'public-common';
    }
  }
}
```

## API 设计

### 新增 API 端点

```typescript
// Agent 管理
POST   /api/agents                    # 创建新 agent
GET    /api/agents                    # 获取所有 agent
GET    /api/agents/[id]               # 获取特定 agent
PUT    /api/agents/[id]               # 更新 agent 信息
DELETE /api/agents/[id]               # 删除 agent

// Agent 交互
POST   /api/agents/[id]/chat          # 与 agent 对话
POST   /api/agents/[id]/action        # 让 agent 执行动作
GET    /api/agents/[id]/status        # 获取 agent 状态

// 群体管理
POST   /api/groups                    # 创建群体
GET    /api/groups                    # 获取所有群体
POST   /api/groups/[id]/join          # agent 加入群体
DELETE /api/groups/[id]/leave         # agent 离开群体

// 记忆管理
GET    /api/agents/[id]/memories      # 获取 agent 记忆
POST   /api/agents/[id]/memories      # 添加记忆
PUT    /api/agents/[id]/memories/[memoryId] # 更新记忆重要性

// 社区监控
GET    /api/community/status          # 社区整体状态
GET    /api/community/interactions    # 最近交互记录
GET    /api/community/events          # 社区事件
```

### 关键 API 实现示例

```typescript
// src/app/api/agents/[id]/chat/route.ts

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { message, context } = await request.json();
    
    // 1. 加载 Agent
    const agent = await Agent.load(id);
    
    // 2. Agent 感知用户消息
    const perception = new Perception({
      type: 'user_message',
      content: message,
      source: 'user',
      context: context
    });
    
    // 3. Agent 思考和决策
    const decision = await agent.think([perception]);
    
    // 4. 生成响应
    const response = await agent.generateResponse(decision, message);
    
    // 5. 存储交互记忆
    await agent.storeInteractionMemory({
      type: 'user_chat',
      content: message,
      response: response.content,
      importance: response.importance
    });
    
    // 6. 更新 agent 状态
    await agent.updateLastActive();
    
    return NextResponse.json({
      response: response.content,
      emotion: response.emotion,
      confidence: response.confidence,
      memory_stored: true
    });
    
  } catch (error) {
    console.error('Agent chat error:', error);
    return NextResponse.json(
      { error: 'Agent interaction failed' },
      { status: 500 }
    );
  }
}
```

## 前端界面设计

### 新增页面和组件

```
src/
├── components/
│   ├── agents/
│   │   ├── AgentCard.tsx           # Agent 卡片
│   │   ├── AgentCreator.tsx        # 创建 Agent
│   │   ├── AgentChat.tsx           # 与 Agent 聊天
│   │   ├── PersonalityEditor.tsx   # 性格编辑器
│   │   └── MemoryViewer.tsx        # 记忆查看器
│   ├── community/
│   │   ├── CommunityOverview.tsx   # 社区概览
│   │   ├── InteractionLog.tsx      # 交互日志
│   │   ├── GroupManager.tsx        # 群体管理
│   │   └── EventTimeline.tsx       # 事件时间线
│   └── dashboard/
│       ├── AdminPanel.tsx          # 管理面板
│       └── Analytics.tsx           # 分析图表
├── app/
│   ├── agents/
│   │   ├── page.tsx                # Agent 列表页
│   │   ├── create/page.tsx         # 创建 Agent 页
│   │   └── [id]/
│   │       ├── page.tsx            # Agent 详情页
│   │       ├── chat/page.tsx       # 聊天页面
│   │       └── memories/page.tsx   # 记忆页面
│   ├── community/
│   │   ├── page.tsx                # 社区首页
│   │   ├── interactions/page.tsx   # 交互记录
│   │   └── groups/page.tsx         # 群体页面
│   └── admin/
│       └── page.tsx                # 管理面板
```

### 核心组件实现

```typescript
// src/components/agents/AgentChat.tsx

'use client'

interface AgentChatProps {
  agentId: string;
  agentName: string;
  personality: PersonalityProfile;
}

const AgentChat: React.FC<AgentChatProps> = ({ agentId, agentName, personality }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [agentEmotion, setAgentEmotion] = useState<string>('neutral');

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: string) => {
      const response = await axios.post(`/api/agents/${agentId}/chat`, {
        message,
        context: {
          conversation_history: messages.slice(-5), // 最近5条消息作为上下文
          user_emotion: detectUserEmotion(message)
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        type: 'agent',
        content: data.response,
        timestamp: new Date(),
        emotion: data.emotion,
        confidence: data.confidence
      }]);
      setAgentEmotion(data.emotion);
      setIsTyping(false);
    }
  });

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      timestamp: new Date()
    }]);
    setIsTyping(true);
    sendMessage(message);
  };

  return (
    <div className="agent-chat-container">
      <div className="agent-status">
        <div className="agent-avatar" data-emotion={agentEmotion}>
          {/* Agent 头像，根据情绪变化 */}
        </div>
        <div className="agent-info">
          <h3>{agentName}</h3>
          <div className="personality-indicators">
            {/* 性格特征可视化 */}
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
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

## 开发里程碑

### Phase 1: 基础架构 (4周)
- [ ] 数据库设计和迁移
- [ ] Agent 基础类实现
- [ ] 记忆管理系统
- [ ] 基础 API 接口

### Phase 2: Agent 智能 (6周)
- [ ] 性格建模系统
- [ ] 决策引擎
- [ ] 记忆检索优化
- [ ] 基础交互能力

### Phase 3: 社交功能 (4周)
- [ ] Agent 间交互
- [ ] 群体动态
- [ ] 事件系统
- [ ] 关系建模

### Phase 4: 前端界面 (6周)
- [ ] Agent 管理界面
- [ ] 聊天界面
- [ ] 社区监控面板
- [ ] 分析图表

### Phase 5: 优化和扩展 (4周)
- [ ] 性能优化
- [ ] 扩展性改进
- [ ] 高级功能
- [ ] 文档完善

## 预期挑战和解决方案

### 技术挑战

1. **记忆一致性**: 使用事务和版本控制确保记忆更新的原子性
2. **性能优化**: 实现记忆层级缓存和智能预加载
3. **扩展性**: 设计微服务架构支持水平扩展
4. **实时交互**: WebSocket + 事件驱动架构

### 算法挑战

1. **记忆重要性评估**: 基于时间衰减、访问频率和关联度的综合算法
2. **性格建模**: 结合心理学理论和机器学习的混合模型
3. **决策引擎**: 多因子决策树结合强化学习

## 参考项目和资源

- **Generative Agents**: Stanford 的虚拟小镇项目
- **LangChain Agents**: Agent 框架和工具
- **AutoGen**: 微软的多Agent系统
- **BigFive 性格模型**: 心理学研究基础
- **Memory Palace**: 记忆系统设计理论

---

这个项目将创造一个真正有"生命力"的 AI 社区，每个 Agent 都有自己的成长轨迹和社交网络。通过分层的记忆系统和丰富的交互机制，我们可以观察到emergent behaviors（涌现行为）的产生，这将是人工智能领域的一个激动人心的探索！