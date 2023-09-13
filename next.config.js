/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    
    

    domains: [
      'upload.wikimedia.org',
      'c6-pi-grupo3.s3.amazonaws.com',
      'cdn.pixabay.com',
      'assets.example.com',
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "via.placeholder.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
