# 个人导航网站系统

这是一个基于 [Next.js](https://nextjs.org/) 和 [Tailwind CSS](https://tailwindcss.com/) 构建的现代化个人导航网站。它轻量、快速，并且非常容易修改和部署。

## ✨ 特性

- ⚡️ **极速加载**: 基于 Next.js 构建，性能优异
- 🎨 **现代设计**: 使用 Tailwind CSS 构建的精美 UI
- 📱 **响应式布局**: 完美适配手机、平板和桌面端
- 🌙 **暗黑模式**: 支持系统级暗黑模式（跟随系统设置）
- 🛠 **易于配置**: 只需修改一个配置文件即可更新内容
- 🚀 **一键部署**: 完美支持 Vercel 部署

## 🚀 快速开始

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📝 如何修改内容

所有的网站配置和链接数据都存储在 `data/siteConfig.ts` 文件中。

### 修改基本信息
修改 `siteConfig` 对象中的 `title`（标题）、`description`（描述）和 `author`（作者）字段。

### 修改社交链接
修改 `social` 数组。你可以从 `lucide-react` 导入更多的图标。

### 添加/修改导航链接
在 `categories` 数组中添加或修改分类。每个分类包含一个 `items` 数组，其中存放具体的链接信息：

```typescript
{
  title: "分类名称",
  items: [
    {
      name: "链接名称",
      url: "https://example.com",
      description: "链接描述（可选）",
    }
  ]
}
```

### 路径前缀配置 (可选)

如果你希望将网站部署到子路径（例如 `your-domain.com/nav`），你可以通过环境变量进行配置：

1. 在 Vercel 的项目设置中，添加环境变量 `NEXT_PUBLIC_BASE_PATH`。
2. 将其值设置为你的子路径（例如 `/nav`）。

---

## 📦 部署到 Vercel

本项目可以通过 Vercel 进行一键部署，这是最推荐的方式。

1. 将代码提交到你的 GitHub 仓库。
2. 访问 [Vercel](https://vercel.com) 并使用 GitHub 账号登录。
3. 点击 "Add New..." -> "Project"。
4. 导入你刚才创建的 GitHub 仓库。
5. 点击 "Deploy" 按钮。

部署完成后，你将获得一个免费的 `*.vercel.app` 域名。以后你只需要将修改推送到 GitHub，Vercel 会自动重新部署你的网站。

## 🛠 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide React](https://lucide.dev/) - 图标库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 🖼️ 图标系统配置

本项目采用了智能的多源图标获取机制，确保在国内外不同网络环境下都能快速、稳定地显示网站图标。

### 工作原理

1. **多级缓存策略**:
   - 浏览器本地存储 (localStorage)
   - CDN 边缘缓存
   - 浏览器 HTTP 缓存 (Cache-Control)

2. **自动回退机制**:
   系统会按优先级尝试以下图标源，直到成功加载：
   1. **内部 API 代理** (`/api/favicon`): 解决跨域和混合内容问题
   2. **国内源** (`api.iowen.cn`): 优化国内访问速度
   3. **备用源** (`rss.ink`, `icon.horse`): 提高可用性
   4. **国际源** (`unavatar.io`, `google`): 保证全球覆盖
   5. **文字头像**: 当所有图标源都不可用时，自动生成基于名称首字母的文字头像

### API 配置

图标代理服务位于 `app/api/favicon/route.ts`，默认配置了长达 30 天的缓存，以减少上游请求并提高性能。

## 📄 许可证

MIT License
