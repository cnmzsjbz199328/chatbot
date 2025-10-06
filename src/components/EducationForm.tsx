'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';

interface Education {
  school: string;
  degree: string;
  startYear: number;
  endYear: number;
}

export default function EducationForm() {
  const { user } = useAuth();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const loadEducation = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('education')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading education:', error);
      } else if (data?.education) {
        setEducationList(data.education);
      }
    } catch (error) {
      console.error('Error loading education:', error);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      loadEducation();
    }
  }, [user, loadEducation]);

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        school: '',
        degree: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear()
      }
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string | number) => {
    const updated = [...educationList];
    updated[index] = { ...updated[index], [field]: value };
    setEducationList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ education: educationList })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setMessage('教育经历已成功更新！');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating education:', error);
      setMessage('更新失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">请先登录以编辑教育经历</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {message && (
        <div className={`rounded-lg p-3 sm:p-4 text-center text-sm sm:text-base ${
          message.includes('成功') 
            ? 'bg-green-900/20 border border-green-500 text-green-400' 
            : 'bg-red-900/20 border border-red-500 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {educationList.length === 0 ? (
        <div className="text-center py-8 text-[var(--text-secondary)]">
          <span className="material-symbols-outlined text-4xl mb-2 block">school</span>
          <p>暂无教育经历，点击下方按钮添加</p>
        </div>
      ) : (
        <div className="space-y-4">
          {educationList.map((edu, index) => (
            <div
              key={index}
              className="rounded-lg bg-[var(--accent-color)]/30 p-4 relative border border-[var(--border-color)]"
            >
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1"
                aria-label="删除"
              >
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="Beijing University"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Degree / Major *
                  </label>
                  <input
                    type="text"
                    required
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="Computer Science and Technology, Bachelor's"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Start Year *
                  </label>
                  <input
                    type="number"
                    required
                    min="1950"
                    max="2100"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(index, 'startYear', parseInt(e.target.value))}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    End Year *
                  </label>
                  <input
                    type="number"
                    required
                    min="1950"
                    max="2100"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, 'endYear', parseInt(e.target.value))}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[var(--border-color)] px-4 py-3 min-h-[44px] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span>Add Education</span>
        </button>

        <button
          type="submit"
          disabled={isLoading || educationList.length === 0}
          className="flex items-center justify-center gap-2 rounded-md bg-[var(--primary-color)] px-6 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span className="material-symbols-outlined text-xl">
            {isLoading ? 'hourglass_empty' : 'save'}
          </span>
          <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
}
