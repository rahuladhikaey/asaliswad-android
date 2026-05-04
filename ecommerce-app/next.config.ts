import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zhmftnlqkfppqnofpgjz.supabase.co",
      },
    ],
  },
  serverExternalPackages: ["razorpay"],
};

export default nextConfig;
