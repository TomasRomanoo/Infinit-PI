// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'assets.example.com',
//           port: '',
//           pathname: 'via.placeholder.com',
//         },
//       ],
//     },
//   }

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["c6-pi-grupo3.s3.amazonaws.com"],
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
