/**
 * 统一的AI模型配置
 * 集中管理所有AI相关的配置，便于维护和升级
 */

import { cohere } from '@ai-sdk/cohere';
import type { LanguageModel } from 'ai';

/**
 * AI模型配置类型
 */
export interface AIModelConfig {
  // 聊天对话模型
  chat: LanguageModel;
  // 信息提取模型（可以使用不同的模型）
  extraction: LanguageModel;
  // 默认温度设置
  defaultTemperature: {
    chat: number;
    extraction: number;
  };
}

/**
 * 环境变量配置
 */
const AI_CONFIG = {
  // 模型名称（可以通过环境变量配置）
  MODEL_NAME: process.env.AI_MODEL_NAME || 'command-r-08-2024',
  
  // 备用模型（如果主模型失败）
  FALLBACK_MODEL: process.env.AI_FALLBACK_MODEL || 'command-r-08-2024',
  
  // 温度配置
  CHAT_TEMPERATURE: parseFloat(process.env.AI_CHAT_TEMPERATURE || '0.7'),
  EXTRACTION_TEMPERATURE: parseFloat(process.env.AI_EXTRACTION_TEMPERATURE || '0.3'),
} as const;

/**
 * 获取AI模型配置
 * 
 * @returns AI模型配置对象
 * 
 * @example
 * ```typescript
 * const config = getAIConfig();
 * const result = await generateText({
 *   model: config.chat,
 *   temperature: config.defaultTemperature.chat,
 *   // ...
 * });
 * ```
 */
export function getAIConfig(): AIModelConfig {
  return {
    // 聊天模型 - 用于对话、回答问题
    chat: cohere(AI_CONFIG.MODEL_NAME),
    
    // 提取模型 - 用于结构化信息提取
    // 可以使用相同或不同的模型
    extraction: cohere(AI_CONFIG.MODEL_NAME),
    
    // 默认温度
    defaultTemperature: {
      chat: AI_CONFIG.CHAT_TEMPERATURE,      // 较高 = 更有创意
      extraction: AI_CONFIG.EXTRACTION_TEMPERATURE,  // 较低 = 更精确
    },
  };
}

/**
 * 获取聊天模型（便捷函数）
 */
export function getChatModel(): LanguageModel {
  return getAIConfig().chat;
}

/**
 * 获取信息提取模型（便捷函数）
 */
export function getExtractionModel(): LanguageModel {
  return getAIConfig().extraction;
}

/**
 * 获取模型配置信息（用于日志）
 */
export function getModelInfo() {
  return {
    modelName: AI_CONFIG.MODEL_NAME,
    fallbackModel: AI_CONFIG.FALLBACK_MODEL,
    chatTemperature: AI_CONFIG.CHAT_TEMPERATURE,
    extractionTemperature: AI_CONFIG.EXTRACTION_TEMPERATURE,
  };
}

// 导出配置常量（只读）
export const AI_MODEL_INFO = getModelInfo();
