/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
