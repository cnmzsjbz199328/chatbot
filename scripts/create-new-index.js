// scripts/create-new-index.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function createNewIndex() {
  try {
    console.log('🚀 Creating new Pinecone index for all-MiniLM-L6-v2 (384 dimensions)...');
    
    // 检查索引是否已存在
    const existingIndexes = await pc.listIndexes();
    const indexName = 'chatbot-384';
    
    if (existingIndexes.indexes?.some(index => index.name === indexName)) {
      console.log(`⚠️  Index "${indexName}" already exists!`);
      console.log('Do you want to delete and recreate it? (manually delete if needed)');
      return;
    }
    
    // 创建新索引
    await pc.createIndex({
      name: indexName,
      dimension: 384,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
    
    console.log('✅ New index "chatbot-384" created successfully!');
    console.log('📝 Index configuration:');
    console.log('   - Name: chatbot-384');
    console.log('   - Dimensions: 384');
    console.log('   - Metric: cosine');
    console.log('   - Type: serverless');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('1. Update your .env file:');
    console.log('   PINECONE_INDEX_NAME=chatbot-384');
    console.log('2. Update pinecone.ts to use the new index');
    console.log('3. Re-upload your documents to populate the new index');
    
  } catch (error) {
    console.error('❌ Error creating index:', error);
    
    if (error.message?.includes('already exists')) {
      console.log('💡 The index already exists. You can either:');
      console.log('   1. Use the existing index');
      console.log('   2. Delete it first and run this script again');
    }
  }
}

async function listExistingIndexes() {
  try {
    console.log('📋 Current Pinecone indexes:');
    const indexes = await pc.listIndexes();
    
    if (indexes.indexes && indexes.indexes.length > 0) {
      indexes.indexes.forEach((index, i) => {
        console.log(`${i + 1}. ${index.name} (${index.dimension || 'unknown'} dimensions)`);
      });
    } else {
      console.log('   No indexes found.');
    }
    console.log('');
  } catch (error) {
    console.error('❌ Error listing indexes:', error);
  }
}

async function main() {
  console.log('🔍 Pinecone Index Manager for all-MiniLM-L6-v2');
  console.log('===============================================');
  
  await listExistingIndexes();
  await createNewIndex();
}

main();
