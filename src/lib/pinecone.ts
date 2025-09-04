import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

// 动态获取索引名称，支持不同维度的索引
export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME || 'chatbot-384';
  return pc.index(indexName);
};

