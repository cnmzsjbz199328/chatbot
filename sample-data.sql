-- 示例用户资料数据
INSERT INTO user_profiles (id, username, display_name, bio, location, github, linkedin, skills) 
VALUES (
  'c33dcee0-84f4-4719-b55c-515a8f2336af',
  'tj15982183241', 
  '张技术',
  '全栈开发工程师，专注于 Web 开发和 AI 应用，拥有 5 年软件开发经验。热衷于学习新技术，喜欢用代码解决实际问题。',
  '中国 深圳',
  'https://github.com/tj15982183241',
  'https://linkedin.com/in/tj15982183241',
  ARRAY['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker']
);

-- 示例项目数据
INSERT INTO user_projects (user_id, title, description, technologies, status, github_url, live_url) 
VALUES 
(
  'c33dcee0-84f4-4719-b55c-515a8f2336af',
  'AI 智能客服系统',
  '基于大语言模型的智能对话系统，支持文档上传和智能问答功能。用户可以上传 PDF 文档进行向量化，访客可以询问关于用户的任何信息。',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Pinecone', 'OpenAI API', 'Tailwind CSS'],
  'active',
  'https://github.com/tj15982183241/chatbot',
  'https://chatbot-demo.vercel.app'
),
(
  'c33dcee0-84f4-4719-b55c-515a8f2336af',
  '电子商务平台',
  '一个功能齐全的电子商务平台，具有用户身份验证、产品目录、购物车和支付网关集成。',
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
  'completed',
  'https://github.com/tj15982183241/ecommerce',
  null
),
(
  'c33dcee0-84f4-4719-b55c-515a8f2336af',
  '数据分析仪表板',
  '一个实时数据可视化和分析仪表板，用于监控业务指标和生成深入的报告。',
  ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
  'active',
  'https://github.com/tj15982183241/dashboard',
  'https://dashboard-demo.vercel.app'
),
(
  'c33dcee0-84f4-4719-b55c-515a8f2336af',
  '移动应用开发',
  '一个跨平台的移动应用程序，提供直观的用户界面和丰富的功能体验。',
  ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux'],
  'completed',
  'https://github.com/tj15982183241/mobile-app',
  null
);
