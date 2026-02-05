/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.20.10.4:9090/api/:path*',
      },
    ]
  },
}

export default nextConfig
