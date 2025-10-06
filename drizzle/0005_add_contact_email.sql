-- 添加公开联系邮箱字段到 user_profiles 表
-- 这个字段与注册邮箱（auth.users.email）分离
-- 用户可以选择填写用于公开展示的联系邮箱

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS contact_email text;

COMMENT ON COLUMN user_profiles.contact_email IS '公开展示的联系邮箱（可选），与注册邮箱分离以保护隐私';

-- 验证字段已添加
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'contact_email';
