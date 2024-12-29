/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@resala/shared', '@resala/backend'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.resala.live',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
