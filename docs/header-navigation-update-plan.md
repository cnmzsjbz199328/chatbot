# 更新计划：修复 “My Portfolio (Loading...)” 问题

## 更新用户需求

原需求：登录后从首页无缝进入公开页面 /${username}，浏览器记住上下文。

当前问题：根路径 (/) 上显示 “My Portfolio (Loading...)” 且不可点击，因为 user.user_metadata?.username 未设置（Supabase metadata 未存储 username），导致回退逻辑失败。username 实际存储在 DB 的 user_profiles 表中，需要从 API 获取。

更新需求：
- **核心**：Header 中的 “我的主页” 始终可点击，链接到 /${username}，无论在根路径还是子路径。
- **增强**：AuthProvider 在登录时自动从 /api/auth/profile 或 /api/profile/${user.id} 获取 profile，包括 username，并缓存到 context 中。避免 Header 直接 fetch（保持组件轻量）。
- **边界**：如果 profile 未创建，提示创建或使用临时 ID（但优先确保 username 可用）；加载状态仅在 auth 初始时显示。
- **测试**：登录后 / 页面链接到 /${username}；子路径链接回仪表板；无 profile 时优雅降级（e.g., 链接到 /profile-setup）。

此更新使导航可靠，减少对 metadata 的依赖，转向 DB 集成。

## 问题分析

- **根因**：Supabase auth.user 不包含 DB profile 数据；metadata 可能仅用于 signup 时设置，但未持久化 username。
- **影响**：根路径无 params.username，回退依赖 metadata（缺失），导致禁用状态。
- **为什么有效**：在 AuthProvider（全局）fetch profile，确保 useAuth 返回完整 user 对象（含 username）。Header 逻辑简化：始终使用 context.username。
- **风险**：API 调用延迟；处理无 profile 情况（e.g., 新用户）。
- **备选**：如果 AuthProvider 复杂，可在 Header useEffect fetch，但优先 context 以复用。

## 实施步骤

### 第一步：审查 AuthProvider

读取 src/components/AuthProvider.tsx，确认当前 user 结构（仅 Supabase user）。如果已有 profile fetch，扩展它。

（工具：read_file src/components/AuthProvider.tsx）

### 第二步：修改 AuthProvider 以 fetch profile

- 引入 API 调用（e.g., fetch('/api/auth/profile')）。
- 在 useEffect 或 onAuthStateChange 中，user 存在时 fetch profile 并合并到 context（e.g., { ...user, profile: { username, ... } }）。
- 更新 useAuth 返回 enhancedUser 含 username。
- 添加 loading 状态直到 profile 加载完成。

示例伪代码：
```tsx
// AuthProvider.tsx
const [profile, setProfile] = useState(null);
useEffect(() => {
  if (user) {
    fetch('/api/auth/profile').then(res => res.json()).then(data => {
      setProfile(data);
    });
  }
}, [user]);

const enhancedUser = user ? { ...user, username: profile?.username } : null;
return <AuthContext.Provider value={{ user: enhancedUser, loading: !user || !profile, ... }}>{children}</AuthContext.Provider>;
```

使用 replace_in_file 添加 fetch 逻辑。

### 第三步：更新 Header 逻辑

简化 Header：使用 context.username 作为主要来源，无需 metadata 或 params 检查（params 仅用于子路径确认）。

- 移除 isOwnPage（简化）。
- 链接始终到 /${username}，如果 username 加载中显示 spinner 或禁用。

```
------- SEARCH
const currentUsername = params?.username as string | undefined;
const userUsername = user?.user_metadata?.username;
const isOwnPage = currentUsername && userUsername && currentUsername === userUsername;
=======
const username = user?.username; // 从 enhancedUser
const isLoadingProfile = loading || !username;
=======
```

JSX 更新：
```
------- SEARCH
{currentUsername && isOwnPage ? (
  <Link href={`/${currentUsername}`}>
    My Portfolio
  </Link>
) : userUsername ? (
  <Link href={`/${userUsername}`}>
    My Portfolio
  </Link>
) : (
  <span>My Portfolio (Loading...)</span>
)}
=======
{isLoadingProfile ? (
  <span className="text-sm font-medium text-gray-500">My Portfolio (Loading...)</span>
) : username ? (
  <Link href={`/${username}`}>
    My Portfolio
  </Link>
) : (
  <span className="text-sm font-medium text-gray-500 cursor-not-allowed">请设置用户名</span>
)}
=======
```

### 第四步：确保 API 支持

如果 /api/auth/profile 未返回 username，更新 src/app/api/auth/profile/route.ts 以从 DB fetch user_profiles by user.id。

（工具：read_file src/app/api/auth/profile/route.ts；如需，replace_in_file 添加 DB query。）

## 验证与后续

- **测试**：登录后 / 页面显示可点击链接到 /${username}；无延迟加载；新用户提示设置 profile。
- **性能**：Cache profile in localStorage 或 context；错误处理（e.g., fetch 失败回退）。
- **益处**：全局 username 可用，支持其他组件；提升 UX 无加载卡顿。
- **时间线**：步骤1-2（AuthProvider）：核心；步骤3（Header）：UI  polish。

此计划基于当前代码，确保逐步实施。
