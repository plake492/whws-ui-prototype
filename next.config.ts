import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Proxy API requests to external API
  async rewrites() {
    const externalApiUrl = process.env.EXTERNAL_API_URL;

    if (!externalApiUrl) {
      console.warn('EXTERNAL_API_URL not set - API requests may not work correctly');
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${externalApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
