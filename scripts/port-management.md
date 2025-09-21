# 端口管理和多实例运行解决方案

## 问题说明
当同时在3000和3001端口运行应用时会出现冲突，这不是项目缺陷，而是开发环境配置问题。

## 解决方案

### 1. 开发环境 - 单实例运行（推荐）

```bash
# 1. 停止所有运行的Next.js进程
taskkill /F /IM node.exe

# 2. 清理端口占用
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# 3. 启动单个实例
npm run dev
```

### 2. 多实例开发环境配置

如果确实需要同时运行多个实例（如开发多个功能分支），需要：

#### A. 使用不同端口和环境配置

```bash
# 实例1 - 主要开发
PORT=3000 npm run dev

# 实例2 - 测试环境
PORT=3001 NEXT_PUBLIC_APP_URL=http://localhost:3001 npm run dev
```

#### B. 创建多环境配置文件

创建 `.env.dev1` 和 `.env.dev2`：

```bash
# .env.dev1
DATABASE_URL=postgresql://postgres.xxx:pwd@host:5432/chatbot_dev1
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.dev2  
DATABASE_URL=postgresql://postgres.xxx:pwd@host:5432/chatbot_dev2
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 生产环境部署考虑

### 单服务器部署
```nginx
# nginx配置负载均衡
upstream nextjs_backend {
    server localhost:3000;
    server localhost:3001;
}

server {
    listen 80;
    location / {
        proxy_pass http://nextjs_backend;
    }
}
```

### 云部署（推荐）
- **Vercel**: 自动处理负载均衡和缩放
- **Docker + Kubernetes**: 容器化部署
- **AWS/云服务**: 使用负载均衡器

## 性能优化建议

### 数据库连接池
```typescript
// lib/db-pool.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

### 缓存策略
```typescript
// 使用Redis缓存减少数据库压力
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)
```

## 监控和诊断

### 检查端口占用
```bash
# Windows
netstat -ano | findstr :3000
tasklist /FI "PID eq [PID]"

# Linux/Mac  
lsof -i :3000
ps aux | grep [PID]
```

### 检查应用健康状态
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    port: process.env.PORT || 3000,
    timestamp: new Date().toISOString()
  })
}
```
