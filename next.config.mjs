/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["encrypted-tbn0.gstatic.com"]
  }
};

export default nextConfig;
