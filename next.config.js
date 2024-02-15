/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "image.tmdb.org",
  //     },
  //   ],
  // },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
