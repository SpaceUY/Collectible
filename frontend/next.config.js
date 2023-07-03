/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "*.nftstorage.link",
      "nftstorage.link",
      "cdn.wallpapersafari.com",
      "w7.pngwing.com",
      "1000marcas.net",
      "i.seadn.io",
    ],
  },
};

module.exports = nextConfig;
