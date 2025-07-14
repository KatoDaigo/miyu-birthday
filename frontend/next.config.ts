import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages用にパスを指定（リポジトリ名がmiyu-birthdayの場合）
  basePath: '/miyu-birthday',
  assetPrefix: '/miyu-birthday/',
};

module.exports = nextConfig;