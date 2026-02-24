/** @type {import('next').NextConfig} */
const nextconfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/filter/:slug*', 
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate', 
          },
        ],
      },
    ]
  }
};

export default nextconfig;
