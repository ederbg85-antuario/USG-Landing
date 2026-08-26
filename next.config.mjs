/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/ganadores",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
