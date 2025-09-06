 POST /api/chat 200 in 5627ms
 ✓ Compiled in 1506ms (1310 modules)
 GET /?id=7aa0cc71-3b68-4bbb-8c42-2da5ddef6919&vscodeBrowserReqId=1757134802811 200 in 574ms
 ○ Compiling /api/upload ...
 ✓ Compiled /api/upload in 954ms (1622 modules)
Received file: File {
  size: 72914,
  type: 'application/pdf',
  name: 'Request for Health Examinations(JIangTang).pdf',
  lastModified: 1757134952708
}
File record created in DB with ID: 24, Session: 0417b486-90c3-40ef-9b07-44b822a17b14
Successfully split PDF into 23 chunks.
Starting cloud embedding process for 23 chunks...
Processing all 23 chunks in one batch...
✅ Batch processed 23 texts in 0.8901s
Embedding process finished. Total vectors created: 23
Upserting batch of 23 records to Pinecone (384d)...
Upsert result: { upsertedCount: 23 }
 POST /api/upload 200 in 7622ms
 ✓ Compiled /api/get-files in 201ms (1279 modules)
 GET /api/get-files 200 in 935ms
 ✓ Compiled /api/chat in 194ms (1299 modules)

[RAG Flow] 1. Received user query: "你能从我的文件中提取信息吗" for session: 0417b486-90c3-40ef-9b07-44b822a17b14
✅ Batch processed 1 texts in 0.0398s
[RAG Flow] 2. Query embedded into vector (first 5 dims): [
  -0.006487728096544743,
  0.1135733351111412,
  0.046806249767541885,
  0.004720782395452261,
  0.008170921355485916
]
[RAG Flow] 3. Pinecone returned 3 matches for session 0417b486-90c3-40ef-9b07-44b822a17b14
[RAG Flow] 4. Constructed context from matches.
[RAG Flow] 5. FINAL PAYLOAD TO AI: {
  "model": {
    "specificationVersion": "v2",
    "supportedUrls": {},
    "modelId": "command-r",
    "config": {
      "provider": "cohere.chat",
      "baseURL": "https://api.cohere.com/v2"
    }
  },
  "system": "You are a helpful assistant. Please answer the user's question based on the following context. If the context does not contain the answer, say that you don't know.\n\nContext:\nApplication summary\nClient nameJiang TANG\nClient date of birth28 March 1993\nDate of application27 August 2025\nApplication ID435707043\nHAP ID30569794\nTransaction reference numberEGP8Z6MLBP\nTravel document IDEJ2768128\nIssuing countryCHINA\nTimeframe for response\nYou must respond to this request within 28 days after you are taken to have received this\nletter.\n---\n*30569794*\nHAP ID: *30569794*\nDear Jiang TANG\nWe require you to complete health examination(s) to ensure that you meet the health\nrequirement for your Temporary Graduate (Post Higher Education Work) (subclass 485) visa\napplication.\nApplication status\nTemporary Graduate (Post Higher\nEducation Work) (subclass 485)\nHealth examinations\nrequired\nApplication summary\nClient nameJiang TANG\n---\nsituation\nYours sincerely\nDepartment of Home Affairs\nSent to: ADMIN@GLOBALZNZ.COM\nSent on: 27 August 2025",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "你好"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "抱歉，我无法处理您的请求。请稍后再试。"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "你能从我的文件中提取信息吗？"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "抱歉，我无法处理您的请求。请稍后再试。"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "你能从我的文件中提取信息吗"
        }
      ]
    }
  ]
}
 POST /api/chat 200 in 5626ms