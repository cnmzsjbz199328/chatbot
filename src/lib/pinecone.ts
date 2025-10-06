import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

// 动态获取索引名称，支持不同维度的索引
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

