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
    domains: ["picsum.photos", "images.unsplash.com","img.clerk.com"], // Add allowed image domains
    formats: ["image/avif", "image/webp"], // Enable optimized formats
  },
};

export default nextConfig;
