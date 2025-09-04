// src/lib/custom-embedding.ts
export async function getCustomEmbedding(texts: string[]): Promise<number[][]> {
  const SERVICE_URL = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8000';
  
  try {
    // 优先使用批量API（性能更好）
    const response = await fetch(`${SERVICE_URL}/embed/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texts }),
      signal: AbortSignal.timeout(60000) // 增加超时时间用于批量处理
    });

    if (!response.ok) {
      throw new Error(`Batch API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Batch processed ${texts.length} texts in ${data.process_time}s`);
    return data.embeddings; // 批量API返回的是 embeddings 数组

  } catch (error) {
    console.warn('Batch API failed, falling back to individual requests:', error);
    
    // 降级到单个请求（向后兼容）
    const allEmbeddings: number[][] = [];
    
    for (const text of texts) {
      const response = await fetch(`${SERVICE_URL}/embed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        throw new Error(`Embedding service error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      allEmbeddings.push(data.embedding);
    }

    return allEmbeddings;
  }
}

// 批量处理函数（为阶段2准备）
export async function getCustomEmbeddingBatch(texts: string[]): Promise<number[][]> {
  const SERVICE_URL = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8000';
  
  try {
    // 尝试批量API
    const response = await fetch(`${SERVICE_URL}/embed/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texts }),
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      throw new Error(`Batch API not available, falling back to individual requests`);
    }

    const data = await response.json();
    return data.embeddings;
  } catch (error) {
    console.warn('Batch API failed, using individual requests:', error);
    // 降级到单个请求
    return await getCustomEmbedding(texts);
  }
}

// 单个文本的便捷函数
export async function getEmbedding(text: string): Promise<number[]> {
  const embeddings = await getCustomEmbedding([text]);
  return embeddings[0];
}

// 健康检查函数
export async function checkEmbeddingServiceHealth(): Promise<boolean> {
  const SERVICE_URL = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8000';
  
  try {
    const response = await fetch(`${SERVICE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5秒超时
    });
    return response.ok;
  } catch (error) {
    console.error('Embedding service health check failed:', error);
    return false;
  }
}
