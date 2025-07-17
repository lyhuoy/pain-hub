import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yts.mx",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.yts.mx",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
