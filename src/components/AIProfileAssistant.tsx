'use client';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { createClient } from '@/lib/supabase/client';

interface ExtractedProfile {
  displayName?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  education?: Array<{
    school: string;
    degree: string;
    startYear: number;
    endYear: number;
  }>;
  workExperience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  hobbies?: Array<{
    name: string;
    icon: string;
  }>;
}

export default function AIProfileAssistant({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient();

  const handleExtractAndSave = async () => {
    if (!inputText.trim()) {
      setError('请输入一些文本以提取信息');
      return;
    }

    if (!user) {
      setError('请先登录');
      return;
    }

    setIsExtracting(true);
    setError(null);
    setMessage(null);

    try {
      // 步骤1: 提取信息
      console.log('[AI Profile] Step 1: Extracting information...');
      const extractResponse = await fetch('/api/ai-profile-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const extractResult = await extractResponse.json();

      if (!extractResponse.ok) {
        throw new Error(extractResult.error || 'Failed to extract information');
      }

      const extractedData: ExtractedProfile = extractResult.data;
      console.log('[AI Profile] Step 1: Extraction successful');

      // 步骤2: 直接保存到数据库（无需用户确认）
      console.log('[AI Profile] Step 2: Saving to database...');
      const profileData = {
        id: user.id,
        display_name: extractedData.displayName,
        avatar: extractedData.avatar,
        bio: extractedData.bio,
        location: extractedData.location,
        phone: extractedData.phone,
        contact_email: extractedData.email,
        website: extractedData.website,
        github: extractedData.github,
        linkedin: extractedData.linkedin,
        skills: extractedData.skills,
        education: extractedData.education,
        work_experience: extractedData.workExperience,
        hobbies: extractedData.hobbies,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert(profileData, {
          onConflict: 'id',
          ignoreDuplicates: false,
        });

      if (upsertError) {
        console.error('[AI Profile] Save error:', upsertError);
        throw new Error(`保存失败: ${upsertError.message}`);
      }

      console.log('[AI Profile] Step 2: Save successful');
      
      // 成功提示
      setMessage('✅ 信息已成功填充！如需调整细节，请使用下方的高级设置。');
      setInputText('');
      
      // 延迟回调以显示成功消息
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error('[AI Profile] Error:', err);
      setError(err instanceof Error ? err.message : '智能填充失败，请重试');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setError(null);
    setMessage(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-900/20 border border-red-500 p-3 sm:p-4 text-red-400 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <div className="rounded-lg bg-green-900/20 border border-green-500 p-3 sm:p-4 text-green-400 text-sm">
          {message}
        </div>
      )}

      {/* Text Input */}
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here to let AI extract profile info for you..."
          className="w-full min-h-[200px] sm:min-h-[300px] rounded-lg border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-3 sm:px-4 sm:py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
          disabled={isExtracting}
        />
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          {inputText.length} txt
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={handleExtractAndSave}
          disabled={isExtracting || !inputText.trim()}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base font-medium shadow-lg"
        >
          {isExtracting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                extracting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">auto_awesome</span>
              One-click import
            </>
          )}
        </button>

        {inputText && !isExtracting && (
          <button
            onClick={handleReset}
            disabled={isExtracting}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-[var(--border-color)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base"
          >
            empty
          </button>
        )}
      </div>

      {/* Info Tip */}
      <div className="flex items-start gap-2 p-3 sm:p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
        <span className="material-symbols-outlined text-blue-400 text-lg flex-shrink-0 mt-0.5">
          info
        </span>
        <div className="text-xs sm:text-sm text-blue-300 space-y-1">
          <p>AI can extract and save profile information for you.</p>
          <p>To adjust details or add content, please use the <span className="font-semibold">Advanced Settings</span> below.</p>
        </div>
      </div>
    </div>
  );
}
