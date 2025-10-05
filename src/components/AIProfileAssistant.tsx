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
  const [isSaving, setIsSaving] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient();

  const handleExtract = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to extract information from');
      return;
    }

    setIsExtracting(true);
    setError(null);
    setExtractedData(null);

    try {
      const response = await fetch('/api/ai-profile-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to extract information');
      }

      setExtractedData(result.data);
      setMessage('✅ Information extracted successfully! Review and save below.');
    } catch (err) {
      console.error('Extract error:', err);
      setError(err instanceof Error ? err.message : 'Failed to extract information');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSave = async () => {
    if (!user || !extractedData) return;

    setIsSaving(true);
    setError(null);
    setMessage(null);

    try {
      // 转换字段名：驼峰 -> 下划线（匹配数据库schema）
      const profileData = {
        id: user.id,
        display_name: extractedData.displayName,
        avatar: extractedData.avatar,
        bio: extractedData.bio,
        location: extractedData.location,
        phone: extractedData.phone,
        website: extractedData.website,
        github: extractedData.github,
        linkedin: extractedData.linkedin,
        skills: extractedData.skills,
        education: extractedData.education,
        work_experience: extractedData.workExperience, // 驼峰 -> 下划线
        hobbies: extractedData.hobbies,
        updated_at: new Date().toISOString(),
      };

      console.log('[AI Profile] Saving data:', profileData);

      const { data: savedData, error: upsertError } = await supabase
        .from('user_profiles')
        .upsert(profileData, {
          onConflict: 'id',
          ignoreDuplicates: false,
        })
        .select();

      if (upsertError) {
        console.error('[AI Profile] Save error:', upsertError);
        console.error('[AI Profile] Error code:', upsertError.code);
        console.error('[AI Profile] Error details:', upsertError.details);
        console.error('[AI Profile] Error hint:', upsertError.hint);
        throw new Error(`保存失败: ${upsertError.message} (${upsertError.code})`);
      }

      console.log('[AI Profile] Save successful:', savedData);
      setMessage('✅ Profile saved successfully!');
      setInputText('');
      setExtractedData(null);
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setExtractedData(null);
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
          placeholder="Example:
My name is John Doe, email: john@example.com
I'm a Full Stack Developer based in Adelaide, Australia
Skills: React, Node.js, TypeScript, Python
Education: Bachelor of Computer Science, University of Adelaide, 2018-2022
Work: Software Engineer at Tech Company from 2022.05 to now
..."
          className="w-full min-h-[200px] sm:min-h-[300px] rounded-lg border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-3 sm:px-4 sm:py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] font-mono"
          disabled={isExtracting || isSaving}
        />
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          {inputText.length} characters • Any format accepted
        </p>
      </div>

      {/* Extract Button */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={handleExtract}
          disabled={isExtracting || isSaving || !inputText.trim()}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base font-medium"
        >
          {isExtracting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Extracting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">auto_awesome</span>
              Extract Information with AI
            </>
          )}
        </button>

        {inputText && !extractedData && (
          <button
            onClick={handleReset}
            disabled={isExtracting || isSaving}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-[var(--border-color)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base"
          >
            Clear
          </button>
        )}
      </div>

      {/* Extracted Data Preview */}
      {extractedData && (
        <div className="rounded-lg border border-[var(--primary-color)] bg-[var(--primary-color)]/10 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
              Extracted Information
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Reset
            </button>
          </div>

          <div className="bg-[var(--accent-color)]/30 rounded-lg p-3 sm:p-4 max-h-[400px] overflow-y-auto">
            <pre className="text-xs sm:text-sm text-[var(--text-primary)] whitespace-pre-wrap break-words font-mono">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          </div>

          <div className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            <span className="material-symbols-outlined text-yellow-400 text-lg flex-shrink-0">
              warning
            </span>
            <p>
              Review the extracted data carefully. You can manually edit it later using the advanced form below.
              This will bypass form validation and save directly to the database.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base font-medium"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">save</span>
                  Save to Database
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
