import fetch from 'node-fetch';

const COHERE_API_KEY = 'LZm1ofmZmkR11EQo4WhKCHMlCueE8mKsmVAyAQju'; // ← 替换为你的实际密钥

const payload = {
  model: 'command-a-reasoning-08-2025',
  messages: [
    {
      role: 'user',
      content: 'Hello world!'
    }
  ],
  thinking: {
    type: 'disabled' // ← 关键参数，禁用推理输出
  }
};

async function runCohereChat() {
  const response = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  console.log('\n🧠 Cohere Response:\n');
  for (const part of result.message.content) {
    if (part.type === 'text') {
      console.log('💬', part.text);
    } else {
      console.log('⚠️ Unexpected type:', part.type);
    }
  }
}

runCohereChat().catch(console.error);