'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import ImageUploadField from '@/components/ImageUploadField';

interface UserProfile {
  id?: string;
  display_name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  contactEmail?: string; // 公开展示的联系邮箱
  website?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
}

export default function UserProfileForm() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState('');
  const supabase = createClient();

  const loadProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
      } else if (data) {
        // 转换字段名：下划线 -> 驼峰（匹配组件状态）
        setProfile({
          ...data,
          contactEmail: data.contact_email, // 下划线 -> 驼峰
        });
        setSkills(data.skills?.join(', ') || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, loadProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage('');

    try {
      // 转换字段名：驼峰 -> 下划线（匹配数据库schema）
      const profileData = {
        id: user.id,
        display_name: profile.display_name,
        avatar: profile.avatar,
        bio: profile.bio,
        location: profile.location,
        phone: profile.phone,
        contact_email: profile.contactEmail, // 驼峰 -> 下划线
        website: profile.website,
        github: profile.github,
        linkedin: profile.linkedin,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean)
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        throw error;
      }

      setMessage('个人信息已成功更新！');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('更新失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 text-center">
        <p className="text-[var(--text-secondary)]">请先log in以编辑个人信息</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
      {message && (
        <div className={`rounded-lg p-3 sm:p-4 text-center text-sm sm:text-base ${
          message.includes('成功') 
            ? 'bg-green-900/20 border border-green-500 text-green-400' 
            : 'bg-red-900/20 border border-red-500 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* 基本信息 */}
      <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-5 lg:p-6 shadow-lg">
        <h3 className="mb-4 sm:mb-5 lg:mb-6 text-lg sm:text-xl font-bold">基本信息</h3>
        
        {/* 头像上传 */}
        <div className="mb-4 sm:mb-5 lg:mb-6">
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            头像
          </label>
          <ImageUploadField
            value={profile.avatar || ''}
            onChange={(imageUrl) => setProfile(prev => ({ ...prev, avatar: imageUrl }))}
            placeholder="点击上传头像..."
            className="w-full sm:max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="display_name">
              显示名称
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="display_name"
              name="display_name"
              type="text"
              value={profile.display_name || ''}
              onChange={handleInputChange}
              placeholder="输入您的显示名称"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="email">
              邮箱地址
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-secondary)] cursor-not-allowed"
              id="email"
              name="email"
              type="email"
              value={user.email || ''}
              disabled
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="location">
              所在地
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="location"
              name="location"
              type="text"
              value={profile.location || ''}
              onChange={handleInputChange}
              placeholder="北京市朝阳区"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="phone">
              联系电话
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="phone"
              name="phone"
              type="tel"
              value={profile.phone || ''}
              onChange={handleInputChange}
              placeholder="+86 138-0000-0000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="contactEmail">
              公开邮箱 <span className="text-xs text-[var(--text-secondary)]">(用于展示)</span>
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={profile.contactEmail || ''}
              onChange={handleInputChange}
              placeholder="contact@example.com"
            />
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              💡 建议：使用专门的工作邮箱，不要使用登录账号邮箱
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-6">
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="bio">
            个人简介
          </label>
          <textarea
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[88px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
            id="bio"
            name="bio"
            rows={4}
            value={profile.bio || ''}
            onChange={handleInputChange}
            placeholder="简单介绍一下自己..."
          />
        </div>
      </div>

      {/* 技能标签 */}
      <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-5 lg:p-6 shadow-lg">
        <h3 className="mb-4 sm:mb-5 lg:mb-6 text-lg sm:text-xl font-bold">技能标签</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="skills">
            技能列表（用逗号分隔）
          </label>
          <input
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="JavaScript, React, Node.js, Python, SQL"
          />
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            输入您掌握的技能，用逗号分隔
          </p>
        </div>

        {/* 技能预览 */}
        {skills && (
          <div className="mt-3 sm:mt-4">
            <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">预览：</p>
            <div className="flex flex-wrap gap-2">
              {skills.split(',').map((skill, index) => {
                const trimmedSkill = skill.trim();
                if (!trimmedSkill) return null;
                return (
                  <span
                    key={index}
                    className="rounded-full bg-[var(--primary-color)]/20 px-3 py-1.5 text-xs sm:text-sm text-[var(--primary-color)]"
                  >
                    {trimmedSkill}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 社交链接 */}
      <div className="rounded-lg bg-[var(--secondary-color)] p-4 sm:p-5 lg:p-6 shadow-lg">
        <h3 className="mb-4 sm:mb-5 lg:mb-6 text-lg sm:text-xl font-bold">Social Links</h3>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="website">
              Personal Website
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="website"
              name="website"
              type="url"
              value={profile.website || ''}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="github">
              GitHub
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="github"
              name="github"
              type="text"
              value={profile.github || ''}
              onChange={handleInputChange}
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="linkedin">
              LinkedIn
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 px-3 py-2.5 sm:px-4 sm:py-3 min-h-[44px] text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="linkedin"
              name="linkedin"
              type="text"
              value={profile.linkedin || ''}
              onChange={handleInputChange}
              placeholder="yourprofile"
            />
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-[var(--primary-color)] px-6 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            {isLoading ? 'hourglass_empty' : 'save'}
          </span>
          <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
}