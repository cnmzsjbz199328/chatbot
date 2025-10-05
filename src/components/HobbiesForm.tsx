'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';

interface Hobby {
  name: string;
  icon: string;
}

// 常用的Material Icons图标选项
const ICON_OPTIONS = [
  'sports_soccer',
  'sports_basketball',
  'sports_tennis',
  'sports_esports',
  'music_note',
  'headphones',
  'piano',
  'brush',
  'palette',
  'camera_alt',
  'photo_camera',
  'movie',
  'theaters',
  'book',
  'menu_book',
  'hiking',
  'terrain',
  'flight',
  'directions_bike',
  'directions_run',
  'fitness_center',
  'pool',
  'restaurant',
  'local_cafe',
  'code',
  'computer',
  'games',
  'pets',
  'park',
  'nature',
];

export default function HobbiesForm() {
  const { user } = useAuth();
  const [hobbiesList, setHobbiesList] = useState<Hobby[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const loadHobbies = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('hobbies')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading hobbies:', error);
      } else if (data?.hobbies) {
        setHobbiesList(data.hobbies);
      }
    } catch (error) {
      console.error('Error loading hobbies:', error);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      loadHobbies();
    }
  }, [user, loadHobbies]);

  const handleAddHobby = () => {
    setHobbiesList([
      ...hobbiesList,
      {
        name: '',
        icon: 'favorite'
      }
    ]);
  };

  const handleRemoveHobby = (index: number) => {
    setHobbiesList(hobbiesList.filter((_, i) => i !== index));
  };

  const handleHobbyChange = (index: number, field: keyof Hobby, value: string) => {
    const updated = [...hobbiesList];
    updated[index] = { ...updated[index], [field]: value };
    setHobbiesList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage('');

    try {
      // 过滤掉空的爱好
      const cleanedHobbies = hobbiesList.filter(hobby => hobby.name.trim() !== '');

      const { error } = await supabase
        .from('user_profiles')
        .update({ hobbies: cleanedHobbies })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setMessage('兴趣爱好已成功更新！');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating hobbies:', error);
      setMessage('更新失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">请先登录以编辑兴趣爱好</p>
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

      {hobbiesList.length === 0 ? (
        <div className="text-center py-8 text-[var(--text-secondary)]">
          <span className="material-symbols-outlined text-4xl mb-2 block">favorite</span>
          <p>暂无兴趣爱好，点击下方按钮添加</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hobbiesList.map((hobby, index) => (
            <div
              key={index}
              className="rounded-lg bg-[var(--accent-color)]/30 p-4 relative border border-[var(--border-color)]"
            >
              <button
                type="button"
                onClick={() => handleRemoveHobby(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1"
                aria-label="删除"
              >
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>

              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    爱好名称 *
                  </label>
                  <input
                    type="text"
                    required
                    value={hobby.name}
                    onChange={(e) => handleHobbyChange(index, 'name', e.target.value)}
                    className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    placeholder="篮球"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    图标 *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={hobby.icon}
                      onChange={(e) => handleHobbyChange(index, 'icon', e.target.value)}
                      className="flex-1 rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 min-h-[44px] text-[var(--text-primary)]"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-[var(--primary-color)]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[var(--primary-color)] text-2xl">
                        {hobby.icon}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    或手动输入Material Icons图标名称
                  </p>
                  <input
                    type="text"
                    value={hobby.icon}
                    onChange={(e) => handleHobbyChange(index, 'icon', e.target.value)}
                    className="w-full mt-2 rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2 text-sm text-[var(--text-primary)]"
                    placeholder="自定义图标名称"
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
          onClick={handleAddHobby}
          className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[var(--border-color)] px-4 py-3 min-h-[44px] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          <span>添加兴趣爱好</span>
        </button>

        <button
          type="submit"
          disabled={isLoading || hobbiesList.length === 0}
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
