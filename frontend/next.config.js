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
      "upload.wikimedia.org",
      "umusicstore.com.ar",
      "i.scdn.co",
      "i0.wp.com",
      "d3ugyf2ht6aenh.cloudfront.net",
      "http2.mlstatic.com",
      "example.com",
      "i.pinimg.com",
      "",
      "alchemy.mypinata.cloud",
      "nft-cdn.alchemy.com",
      "gateway.pinata.cloud",
    ],
  },
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @next module to managedPaths
      // Allows for hot refresh of changes to @next module
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!weavedb-sdk)/],
      // managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!weavedb-base)/],
    };
    return config;
  },
};

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

module.exports = nextConfig;
