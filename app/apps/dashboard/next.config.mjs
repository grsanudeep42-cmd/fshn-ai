/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@myfashion/shared-types'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

export default nextConfig;
