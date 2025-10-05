'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export default function WorkExperienceForm() {
  const { user } = useAuth();
  const [workList, setWorkList] = useState<WorkExperience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const loadWorkExperience = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('work_experience')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading work experience:', error);
      } else if (data?.work_experience) {
        setWorkList(data.work_experience);
      }
    } catch (error) {
      console.error('Error loading work experience:', error);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      loadWorkExperience();
    }
  }, [user, loadWorkExperience]);

  const handleAddWork = () => {
    setWorkList([
      ...workList,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ['']
      }
    ]);
  };

  const handleRemoveWork = (index: number) => {
    setWorkList(workList.filter((_, i) => i !== index));
  };

  const handleWorkChange = (index: number, field: keyof Omit<WorkExperience, 'description'>, value: string) => {
    const updated = [...workList];
    updated[index] = { ...updated[index], [field]: value };
    setWorkList(updated);
  };

  const handleDescriptionChange = (workIndex: number, descIndex: number, value: string) => {
    const updated = [...workList];
    updated[workIndex].description[descIndex] = value;
    setWorkList(updated);
  };

  const handleAddDescription = (workIndex: number) => {
    const updated = [...workList];
    updated[workIndex].description.push('');
    setWorkList(updated);
  };

  const handleRemoveDescription = (workIndex: number, descIndex: number) => {
    const updated = [...workList];
    updated[workIndex].description = updated[workIndex].description.filter((_, i) => i !== descIndex);
    setWorkList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage('');

    try {
      // 过滤掉空的描述项
      const cleanedWorkList = workList.map(work => ({
        ...work,
        description: work.description.filter(desc => desc.trim() !== '')
      }));

      const { error } = await supabase
        .from('user_profiles')
        .update({ work_experience: cleanedWorkList })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setMessage('工作经历已成功更新！');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating work experience:', error);
      setMessage('更新失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">请先登录以编辑工作经历</p>
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

      {workList.length === 0 ? (
        <div className="text-center py-8 text-[var(--text-secondary)]">
          <span className="material-symbols-outlined text-4xl mb-2 block">work</span>
          <p>暂无工作经历，点击下方按钮添加</p>
        </div>
      ) : (
        <div className="space-y-6">
          {workList.map((work, workIndex) => (
            <div
              key={workIndex}
              className="rounded-lg bg-[var(--accent-color)]/30 p-4 relative border border-[var(--border-color)]"
            >
              <button
                type="button"
                onClick={() => handleRemoveWork(workIndex)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1"
                aria-label="删除"
              >
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    公司名称 *
                  </label>
                  <input
                    type="text"
                    required
                    value={work.company}
                    onChange={(e) => handleWorkChange(workIndex, 'company', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="腾讯科技有限公司"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    职位 *
                  </label>
                  <input
                    type="text"
                    required
                    value={work.position}
                    onChange={(e) => handleWorkChange(workIndex, 'position', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="高级前端工程师"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    开始日期 *
                  </label>
                  <input
                    type="text"
                    required
                    value={work.startDate}
                    onChange={(e) => handleWorkChange(workIndex, 'startDate', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="2015.07 或 2015-07"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    结束日期 *
                  </label>
                  <input
                    type="text"
                    required
                    value={work.endDate}
                    onChange={(e) => handleWorkChange(workIndex, 'endDate', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="2020.08 或 now"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    工作描述
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddDescription(workIndex)}
                    className="text-xs text-[var(--primary-color)] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    添加描述项
                  </button>
                </div>

                {work.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleDescriptionChange(workIndex, descIndex, e.target.value)}
                      className="flex-1 rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                      placeholder="负责前端架构设计和技术选型..."
                    />
                    {work.description.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDescription(workIndex, descIndex)}
                        className="text-red-400 hover:text-red-300 px-2"
                        aria-label="删除描述"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          type="button"
          onClick={handleAddWork}
          className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[var(--border-color)] px-4 py-3 min-h-[44px] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span>添加工作经历</span>
        </button>

        <button
          type="submit"
          disabled={isLoading || workList.length === 0}
          className="flex items-center justify-center gap-2 rounded-md bg-[var(--primary-color)] px-6 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span className="material-symbols-outlined text-xl">
            {isLoading ? 'hourglass_empty' : 'save'}
          </span>
          <span>{isLoading ? '保存中...' : '保存更改'}</span>
        </button>
      </div>
    </form>
  );
}
