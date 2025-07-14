import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '', // 削除
  // assetPrefix: '', // 削除
};

module.exports = nextConfig;