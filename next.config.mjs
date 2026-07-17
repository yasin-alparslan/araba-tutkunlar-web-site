/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // Vercel'de TypeScript hatalarını build sırasında görmezden gelir
  typescript: {
    ignoreBuildErrors: true,
  },

  // Vercel'de ESLint hatalarını build sırasında görmezden gelir
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
