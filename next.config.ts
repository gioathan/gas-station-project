import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['resend'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkznwwnzwvvcjqvgkube.supabase.co',
        pathname: '/storage/v1/object/public/megistanas/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year — never re-optimize the same image
    deviceSizes: [640, 1080, 1920],
    imageSizes: [64, 256, 384],
  },
};

export default withNextIntl(nextConfig);