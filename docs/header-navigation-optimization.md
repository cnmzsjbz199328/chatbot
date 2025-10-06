# 优化方案：修复 “我的主页” 导航链接

## 问题描述

当前 Header.tsx 中的 “我的主页” 链接依赖于 useAuth() 获取的log in用户信息（user.user_metadata?.username || user.id），这会导致以下问题：
- **固定链接**：无论当前页面路径如何，链接始终指向log in用户的固定路径（e.g., /tj15982183241）。如果用户在自己的子页面（如 /tj15982183241/projectManagement）中，点击链接会正确返回仪表板，但如果路径不匹配（e.g., 查看他人页面或根路径 /），可能导致意外导航或不一致体验。
- **上下文丢失**：浏览器不会“记住”当前用户上下文（URL 中的 username），导致从首页log in后无法无缝进入自己的公开页面 /${username}。
- **潜在回退问题**：如果 user_metadata.username 未设置，回退到 user.id（UUID），这不是用户友好的 URL（e.g., /uuid-long-string），影响 SEO 和分享。

目标：使链接动态基于当前 URL 参数（useParams），在用户特定路由下链接到 /[username]（仪表板），并在根路径下回退到log in用户的主页。同时，确保仅在匹配log in用户时启用链接（避免误导）。

## 方案分析

- **为什么有效**：Next.js App Router 的 useParams() 可以安全提取动态段 [username]，无需依赖 auth 数据。这确保导航始终与当前上下文一致（e.g., 在 /tj15982183241/projectManagement 中，链接到 /tj15982183241）。如果无参数，回退到 auth 用户数据，提供渐进式支持。
- **优势**：
  - 上下文感知：浏览器 URL 作为“记忆”，无需额外状态管理。
  - 健壮性：条件渲染避免无效链接；类型安全（TypeScript）。
  - 兼容性：适用于公开查看（禁用或隐藏）和私有仪表板。
- **潜在风险**：如果用户查看他人页面，链接应禁用以防混淆。假设此修复针对自己的页面（log in后）。
- **测试点**：根路径 /（回退到用户主页）；子路径 /${username}/...（链接到仪表板）；登出状态（隐藏链接）。

## 实施步骤

### 第一步：引入 useParams 钩子

在 src/components/Header.tsx 顶部更新导入，从 'next/navigation' 引入 useParams。

使用 replace_in_file 以精确匹配现有导入。

```
------- SEARCH
import { useRouter } from 'next/navigation';
=======
import { useRouter, useParams } from 'next/navigation';
+++++++ REPLACE
```

### 第二步：更新组件逻辑

在 Header 函数顶部添加 params 和 username 提取，并添加匹配检查（可选：确保 username 与log in用户匹配）。

```
------- SEARCH
export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
=======
export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const params = useParams();
  const currentUsername = params?.username as string | undefined;
  const userUsername = user?.user_metadata?.username;
  const isOwnPage = currentUsername && userUsername && currentUsername === userUsername;
+++++++ REPLACE
```

### 第三步：更新 JSX 渲染逻辑

替换log in用户的 nav 部分：如果有 currentUsername 且匹配用户，则链接到 /${currentUsername}；否则回退到 /${userUsername} 或禁用。

```
------- SEARCH
{loading ? (
  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
) : user ? (
  <div className="flex items-center gap-4">
    <Link 
      className="text-sm font-medium text-gray-300 transition-colors hover:text-white" 
      href={`/${user.user_metadata?.username || user.id}`}
    >
      我的主页
    </Link>
    <button 
      onClick={handleSignOut}
      className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
    >
      退出log in
    </button>
  </div>
) : (
  <div className="flex items-center gap-4">
    <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/login">log in</Link>
    <Link className="rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href="/register">sign up</Link>
  </div>
)}
=======
{loading ? (
  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
) : user ? (
  <div className="flex items-center gap-4">
    {currentUsername && isOwnPage ? (
      <Link 
        className="text-sm font-medium text-gray-300 transition-colors hover:text-white" 
        href={`/${currentUsername}`}
      >
        我的主页
      </Link>
    ) : userUsername ? (
      <Link 
        className="text-sm font-medium text-gray-300 transition-colors hover:text-white" 
        href={`/${userUsername}`}
      >
        我的主页
      </Link>
    ) : (
      <span className="text-sm font-medium text-gray-500 cursor-not-allowed">
        我的主页 (加载中...)
      </span>
    )}
    <button 
      onClick={handleSignOut}
      className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
    >
      退出log in
    </button>
  </div>
) : (
  <div className="flex items-center gap-4">
    <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" href="/login">log in</Link>
    <Link className="rounded-md bg-[var(--primary-color)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80" href="/register">sign up</Link>
  </div>
)}
+++++++ REPLACE
```

## 验证与后续

- **测试**：log in后访问 /（应链接到 /${username}）；访问 /${username}/projectManagement（应链接回 /${username}）；登出（隐藏链接）。
- **益处**：提升 UX 一致性；减少 auth 数据依赖；易维护。
- **如果不匹配**：若 currentUsername 不等于用户 username，考虑重定向或日志（未来增强）。

此方案基于当前代码，确保原子化修改以避免中断。
