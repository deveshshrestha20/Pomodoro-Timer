import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // This will create a 308 redirect
      },
    ];
  },
};

export default nextConfig;
