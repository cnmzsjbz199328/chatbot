 ○ Compiling /api/upload ...
 ✓ Compiled /api/upload in 862ms (1033 modules)
Received file: File {
  size: 79282,
  type: 'application/pdf',
  name: 'Invoice_Electricity-1783367-328.pdf',
  lastModified: 1756864135731
}
File record created in DB with ID: 10
Successfully split PDF into 15 chunks.
Requesting embedding model...
No pipeline instance found in global cache. Creating a new one...
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: 100.00%
Model loading progress: undefined%
Model loading progress: 100.00%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: undefined%
Model loading progress: 100.00%
Model loading progress: undefined%
Model loading progress: 100.00%
Model loading progress: undefined%
Model loading progress: undefined%
Model is ready. Starting embedding process for 15 chunks...
Embedding batch 1...
Embedding batch 2...
Embedding batch 3...
Embedding process finished. Total vectors created: 15
Upserting batch of 15 records to Pinecone...
Upsert result: { upsertedCount: 15 }
 POST /api/upload 200 in 14938ms
 GET /api/get-files 200 in 119ms
 ○ Compiling /api/chat ...
 ✓ Compiled /api/chat in 548ms (1051 modules)

[RAG Flow] 1. Received user query: "为我分析一下当前月份的账单"
Found pipeline instance in global cache. Reusing it.
[RAG Flow] 2. Query embedded into vector (first 5 dims): [
  0.04090072214603424,
  0.022559642791748047,
  -0.05296928063035011,
  -0.057192884385585785,
  0.025912092998623848
]
[RAG Flow] 3. Pinecone returned matches: 3
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
  "system": "You are a helpful assistant. Please answer the user's question based on the following context. If the context does not contain the answer, say that you don't know.\n\nContext:\n0 (Actual) on 25/02/2025181.921 (Actual) on 22/03/20251.0000181.9210 kWh\n0 (Actual) on 25/02/20250 (Actual) on 22/03/20251.00000.0000 kWh\n0 (Actual) on 25/02/202519.743 (Actual) on 22/03/20251.000019.7430 kWh\n0 (Actual) on 25/02/20250 (Actual) on 22/03/20251.00000.0000 kWh\nSupply Charges (GST incl)\nDescriptionCharge periodUsageUnit PriceTotal price (GST incl)\n---\nDaily Charge25/2/25 - 22/3/2526.0000$ 1.509200$ 39.24\nOff Peak26/2/25 - 22/3/2566.5350$ 0.248600$ 16.54\nPeak26/2/25 - 22/3/25181.9210$ 0.378400$ 68.84\nShoulder26/2/25 - 22/3/2519.7430$ 0.281600$ 5.56\nTotal Cost$ 130.18\nOff Peak: everyday 10am - 3pm.\nPeak: everyday 6am - 10am and 3pm - 1am.\nShoulder: everyday 1am - 6am.\nPayment Assistance\nIf you’re experiencing payment difficulty, we can\n---\nIssue date: 27 March 2025\nElectricity Faults\nCall SA Power Network: 13 13 66\nAccount details\nAccount number: 1783367\nAccount name: Jiang Tang\nSite details\nNational Metering Identifier (NMI):\n20022658127\nSupply address:\n1/235 OLD SOUTH Road OLD\nREYNELLA SA 5161\nIssues with your account?\nFor enquiries and complaints call us\non 1300 662 778.\nEnergy and Water Ombudsman (South\nAustralia)\n1800 665 565",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "为我分析一下当前月份的账单"
        }
      ]
    }
  ]
}
 POST /api/chat 200 in 8658ms
 ✓ Compiled /api/files/[id] in 190ms (630 modules)
Error: Route "/api/files/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at DELETE (src\app\api\files\[id]\route.ts:7:40)
   5 | export async function DELETE(request: Request, { params }: { params: { id: string } }) {
   6 |     try {
>  7 |         const fileId = parseInt(params.id, 10);
     |                                        ^
   8 |
   9 |         if (isNaN(fileId)) {
  10 |             return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
Attempting to delete file with ID: 10
Pinecone deletion successful for 15 vectors.
Deleting record from PostgreSQL with ID: 10
PostgreSQL deletion successful.
 DELETE /api/files/10 200 in 4331ms
 ✓ Compiled /api/get-files in 171ms (632 modules)
 GET /api/get-files 200 in 798ms