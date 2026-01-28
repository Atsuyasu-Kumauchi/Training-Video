import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.youtube.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
};

export default nextConfig;
