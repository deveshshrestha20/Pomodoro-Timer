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
};

export default nextConfig;
