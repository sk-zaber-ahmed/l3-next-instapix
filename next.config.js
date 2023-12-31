/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "instagram.fpnq13-1.fna.fbcdn.net",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/shadcn.png",
      },
      {
        protocol: "https",
        hostname: "selisefalcon.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
