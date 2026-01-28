import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",

      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: '/vi/**'
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: '/**'
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
};

export default nextConfig;
