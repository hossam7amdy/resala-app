/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@resala/shared'],
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
};

export default nextConfig;
