import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect configuration
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // This will create a 308 redirect
      },
    ];
  },

  // Experimental features configuration
  experimental: {
    optimizeCss: true, // Enables CSS optimization
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // Enable optimized formats
  },
};

export default nextConfig;
