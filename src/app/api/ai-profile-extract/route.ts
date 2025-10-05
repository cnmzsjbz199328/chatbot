export const runtime = 'nodejs';

import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { getAIConfig } from '@/lib/ai-config';

export const maxDuration = 30;

/**
 * AI辅助提取个人信息API
 * 输入：用户提供的任意格式文本
 * 输出：结构化的个人信息JSON
 */
export async function POST(req: Request) {
  console.log('\n[AI PROFILE EXTRACT] ===================');
  console.log('[AI PROFILE EXTRACT] 收到信息提取请求');

  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid text input' }, { status: 400 });
    }

    console.log('[AI PROFILE EXTRACT] 文本长度:', text.length);

    // 构建提示词，让AI按照数据库schema提取信息
    const systemPrompt = `You are an AI assistant that extracts structured personal information from unformatted text.

**Your task:** Parse the user's text and extract information according to the following database schema:

**Database Schema:**
\`\`\`typescript
{
  displayName?: string;           // Display name
  avatar?: string;                // Avatar URL (if provided)
  bio?: string;                   // Personal biography/introduction
  location?: string;              // Location
  phone?: string;                 // Phone number
  website?: string;               // Personal website
  github?: string;                // GitHub URL
  linkedin?: string;              // LinkedIn URL
  skills?: string[];              // Skills array
  
  education?: Array<{             // Education history
    school: string;
    degree: string;
    startYear: number;
    endYear: number;
  }>;
  
  workExperience?: Array<{        // Work experience
    company: string;
    position: string;
    startDate: string;            // Format: "YYYY.MM" or "now"
    endDate: string;              // Format: "YYYY.MM" or "now"
    description: string[];        // Array of job descriptions
  }>;
  
  hobbies?: Array<{               // Hobbies
    name: string;
    icon: string;                 // Material icon name (e.g., "sports_soccer")
  }>;
}
\`\`\`

**Important Rules:**
1. Extract ONLY the information explicitly mentioned in the text
2. Leave fields empty/undefined if not mentioned
3. For dates: use "YYYY.MM" format (e.g., "2020.05") or "now" for current positions
4. For hobbies icons: suggest appropriate Material Symbols icon names
5. Return ONLY valid JSON, no additional text or explanation
6. If the text is unclear or ambiguous, make your best reasonable interpretation
7. For skills, extract all technical and professional skills mentioned

**Output format:** Return a single JSON object matching the schema above.`;

    // 调用AI模型
    const aiConfig = getAIConfig();
    const result = await generateText({
      model: aiConfig.extraction,
      prompt: systemPrompt + '\n\nUser text to parse:\n' + text,
      temperature: aiConfig.defaultTemperature.extraction, // 较低温度保证输出稳定
    });

    console.log('[AI PROFILE EXTRACT] AI响应长度:', result.text.length);

    // 解析AI返回的JSON
    let extractedData;
    try {
      // 提取JSON (AI可能会返回```json...```包裹的内容)
      const jsonMatch = result.text.match(/```json\s*([\s\S]*?)\s*```/) || 
                       result.text.match(/```\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : result.text;
      
      extractedData = JSON.parse(jsonText);
      console.log('[AI PROFILE EXTRACT] 成功提取字段:', Object.keys(extractedData));
    } catch (parseError) {
      console.error('[AI PROFILE EXTRACT] JSON解析失败:', parseError);
      return NextResponse.json({ 
        error: 'Failed to parse AI response as JSON',
        rawResponse: result.text
      }, { status: 500 });
    }

    // 数据清理和验证
    const cleanedData = cleanExtractedData(extractedData);

    console.log('[AI PROFILE EXTRACT] 提取完成');
    return NextResponse.json({ 
      success: true,
      data: cleanedData,
      rawText: result.text // 供调试用
    });

  } catch (error) {
    console.error('[AI PROFILE EXTRACT] 错误:', error);
    return NextResponse.json({ 
      error: 'Failed to extract profile information',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * 清理和验证提取的数据
 */
function cleanExtractedData(data: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};

  // 基本字段
  if (data.displayName) cleaned.displayName = String(data.displayName).trim();
  if (data.email) cleaned.email = String(data.email).trim();
  if (data.avatar) cleaned.avatar = String(data.avatar).trim();
  if (data.bio) cleaned.bio = String(data.bio).trim();
  if (data.location) cleaned.location = String(data.location).trim();
  if (data.phone) cleaned.phone = String(data.phone).trim();
  if (data.website) cleaned.website = String(data.website).trim();
  if (data.github) cleaned.github = String(data.github).trim();
  if (data.linkedin) cleaned.linkedin = String(data.linkedin).trim();

  // 技能数组
  if (Array.isArray(data.skills)) {
    cleaned.skills = data.skills
      .filter((s: unknown) => typeof s === 'string' && s.trim())
      .map((s: unknown) => String(s).trim());
  }

  // 教育经历
  if (Array.isArray(data.education)) {
    cleaned.education = data.education
      .filter((e: unknown) => typeof e === 'object' && e !== null && 'school' in e && 'degree' in e)
      .map((e: Record<string, unknown>) => ({
        school: String(e.school).trim(),
        degree: String(e.degree).trim(),
        startYear: parseInt(String(e.startYear)) || new Date().getFullYear(),
        endYear: parseInt(String(e.endYear)) || new Date().getFullYear(),
      }));
  }

  // 工作经历
  if (Array.isArray(data.workExperience)) {
    cleaned.workExperience = data.workExperience
      .filter((w: unknown) => typeof w === 'object' && w !== null && 'company' in w && 'position' in w)
      .map((w: Record<string, unknown>) => ({
        company: String(w.company).trim(),
        position: String(w.position).trim(),
        startDate: String(w.startDate).trim(),
        endDate: String(w.endDate).trim(),
        description: Array.isArray(w.description) 
          ? w.description.map((d: unknown) => String(d).trim())
          : []
      }));
  }

  // 兴趣爱好
  if (Array.isArray(data.hobbies)) {
    cleaned.hobbies = data.hobbies
      .filter((h: unknown) => typeof h === 'object' && h !== null && 'name' in h)
      .map((h: Record<string, unknown>) => ({
        name: String(h.name).trim(),
        icon: String(h.icon || 'interests').trim()
      }));
  }

  return cleaned;
}
