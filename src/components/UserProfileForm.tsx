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
        setProfile(data);
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
      const profileData = {
        ...profile,
        id: user.id,
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`rounded-lg p-4 text-center ${
          message.includes('成功') 
            ? 'bg-green-900/20 border border-green-500 text-green-400' 
            : 'bg-red-900/20 border border-red-500 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* 基本信息 */}
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">基本信息</h3>
        
        {/* 头像上传 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            头像
          </label>
          <ImageUploadField
            value={profile.avatar || ''}
            onChange={(imageUrl) => setProfile(prev => ({ ...prev, avatar: imageUrl }))}
            placeholder="点击上传头像..."
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="display_name">
              显示名称
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-secondary)] cursor-not-allowed"
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
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
              id="phone"
              name="phone"
              type="tel"
              value={profile.phone || ''}
              onChange={handleInputChange}
              placeholder="+86 138-0000-0000"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="bio">
            个人简介
          </label>
          <textarea
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">技能标签</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="skills">
            技能列表（用逗号分隔）
          </label>
          <input
            className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="JavaScript, React, Node.js, Python, SQL"
          />
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            输入您掌握的技能，用逗号分隔
          </p>
        </div>

        {/* 技能预览 */}
        {skills && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-[var(--text-secondary)]">预览：</p>
            <div className="flex flex-wrap gap-2">
              {skills.split(',').map((skill, index) => {
                const trimmedSkill = skill.trim();
                if (!trimmedSkill) return null;
                return (
                  <span
                    key={index}
                    className="rounded-full bg-[var(--primary-color)]/20 px-3 py-1 text-sm text-[var(--primary-color)]"
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
      <div className="rounded-lg bg-[var(--secondary-color)] p-6 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">社交链接</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]" htmlFor="website">
              个人网站
            </label>
            <input
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
              className="w-full rounded-md border border-[var(--border-color)] bg-[var(--accent-color)]/50 py-2 px-4 text-[var(--text-primary)] focus:border-primary-500 focus:ring-primary-500"
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
          className="flex items-center gap-2 rounded-md bg-[var(--primary-color)] px-6 py-3 text-sm font-semibold text-white hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">
            {isLoading ? 'hourglass_empty' : 'save'}
          </span>
          <span>{isLoading ? '保存中...' : '保存更改'}</span>
        </button>
      </div>
    </form>
  );
}