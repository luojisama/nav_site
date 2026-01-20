import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // 如果你需要部署到 GitHub Pages 等静态托管平台，通常需要 output: 'export'
  // output: 'export',
};

export default nextConfig;
