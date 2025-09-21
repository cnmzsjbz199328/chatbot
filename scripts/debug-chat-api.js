/**
 * AI Chat API 调试脚本
 * 用于诊断聊天 API 调用失败的问题
 */

const fs = require('fs');
const path = require('path');

console.log('=== AI Chat API 调试报告 ===\n');

// 1. 检查环境变量
console.log('1. 环境变量检查:');
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasCohere = envContent.includes('COHERE_API_KEY');
    const hasSupabase = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
    const hasPinecone = envContent.includes('PINECONE_API_KEY');
    
    console.log(`   ✓ .env.local 存在`);
    console.log(`   ${hasCohere ? '✓' : '✗'} COHERE_API_KEY 配置`);
    console.log(`   ${hasSupabase ? '✓' : '✗'} Supabase 配置`);
    console.log(`   ${hasPinecone ? '✓' : '✗'} Pinecone 配置`);
} else {
    console.log('   ✗ .env.local 文件不存在');
}

// 2. 检查关键文件
console.log('\n2. 关键文件检查:');
const criticalFiles = [
    'src/app/api/chat/route.ts',
    'src/lib/auth.ts',
    'src/lib/custom-embedding.ts',
    'src/lib/pinecone.ts',
    'src/components/ChatContainer.tsx'
];

criticalFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    const exists = fs.existsSync(fullPath);
    console.log(`   ${exists ? '✓' : '✗'} ${filePath}`);
});

// 3. 分析认证流程
console.log('\n3. 认证流程分析:');
const authPath = path.join(__dirname, '..', 'src/lib/auth.ts');
if (fs.existsSync(authPath)) {
    const authContent = fs.readFileSync(authPath, 'utf8');
    
    const hasNewCookiesAPI = authContent.includes('await cookies()');
    const hasSupabaseClient = authContent.includes('createClient');
    const hasErrorHandling = authContent.includes('try {') && authContent.includes('catch');
    
    console.log(`   ${hasNewCookiesAPI ? '✓' : '✗'} Next.js 15 cookies API 兼容`);
    console.log(`   ${hasSupabaseClient ? '✓' : '✗'} Supabase client 初始化`);
    console.log(`   ${hasErrorHandling ? '✓' : '✗'} 错误处理机制`);
}

// 4. 分析 Chat API
console.log('\n4. Chat API 分析:');
const chatApiPath = path.join(__dirname, '..', 'src/app/api/chat/route.ts');
if (fs.existsSync(chatApiPath)) {
    const chatContent = fs.readFileSync(chatApiPath, 'utf8');
    
    const hasUserAuth = chatContent.includes('getAuthenticatedUser');
    const hasSessionFallback = chatContent.includes('X-Session-Id');
    const hasCohereImport = chatContent.includes('@ai-sdk/cohere');
    const hasStreamText = chatContent.includes('streamText');
    const hasErrorLogging = chatContent.includes('console.error');
    
    console.log(`   ${hasUserAuth ? '✓' : '✗'} 用户认证检查`);
    console.log(`   ${hasSessionFallback ? '✓' : '✗'} Session ID 后备方案`);
    console.log(`   ${hasCohereImport ? '✓' : '✗'} Cohere AI 集成`);
    console.log(`   ${hasStreamText ? '✓' : '✗'} 流式响应处理`);
    console.log(`   ${hasErrorLogging ? '✓' : '✗'} 错误日志记录`);
}

// 5. 分析前端调用
console.log('\n5. 前端调用分析:');
const chatContainerPath = path.join(__dirname, '..', 'src/components/ChatContainer.tsx');
if (fs.existsSync(chatContainerPath)) {
    const chatContainerContent = fs.readFileSync(chatContainerPath, 'utf8');
    
    const hasSessionIdHeader = chatContainerContent.includes('X-Session-Id');
    const hasErrorHandling = chatContainerContent.includes('response.ok');
    const hasStreamProcessing = chatContainerContent.includes('getReader');
    
    console.log(`   ${hasSessionIdHeader ? '✓' : '✗'} Session ID 头部设置`);
    console.log(`   ${hasErrorHandling ? '✓' : '✗'} 响应错误处理`);
    console.log(`   ${hasStreamProcessing ? '✓' : '✗'} 流式响应处理`);
}

console.log('\n=== 问题诊断 ===\n');

console.log('根据上述检查结果，可能的问题原因：');
console.log('1. 用户未登录且前端未正确发送 X-Session-Id 头部');
console.log('2. Supabase 认证 token 解析失败或格式不正确');
console.log('3. Next.js 15 cookies API 兼容性问题');
console.log('4. 环境变量未正确加载或配置错误');

console.log('\n建议解决方案：');
console.log('1. 检查浏览器 cookies 中是否存在 sb-phjuvvnhdasdvxmzyowg-auth-token');
console.log('2. 验证 X-Session-Id 头部是否正确发送');
console.log('3. 添加更详细的日志记录以定位具体失败点');
console.log('4. 测试简化版的认证逻辑');
