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
  // output: 'export',
  
  images: {
    unoptimized: true ,
    domains: ["c6-pi-grupo3.s3.amazonaws.com"],
    domains: ['cdn.pixabay.com'],
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
