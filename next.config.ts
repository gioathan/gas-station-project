import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['resend'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkznwwnzwvvcjqvgkube.supabase.co',
        pathname: '/storage/v1/object/public/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;