# Vercel环境变量配置指南

在Vercel项目设置中配置以下环境变量：

## 数据库配置
DATABASE_URL=postgresql://postgres.phjuvvnhdasdvxmzyowg:SQOCaRDJjRb88Eap@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

## Pinecone配置（384维索引）
PINECONE_API_KEY=pcsk_6dwYD2_FDJcASn1GWZHkn9KEYE36RzMJoTDs1FKqnc8onu7roC3jvjoUC2FoVHnRmNZ2zd
PINECONE_INDEX_NAME=chatbot-384

## AI模型配置
COHERE_API_KEY=LZm1ofmZmkR11EQo4WhKCHMlCueE8mKsmVAyAQju

## 🚀 关键：云端Embedding服务
EMBEDDING_SERVICE_URL=https://embedding.badtom.dpdns.org

## 注意事项
- 所有变量都设置为 "All Environments" (Development, Preview, Production)
- EMBEDDING_SERVICE_URL 是关键，它替代了本地模型
- 无需任何Python或机器学习相关的环境变量
