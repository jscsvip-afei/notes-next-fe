import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 图片优化
  },
};

export default nextConfig;
