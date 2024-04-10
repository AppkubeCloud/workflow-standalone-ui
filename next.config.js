/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: ["**"],
    },
};

module.exports = nextConfig;
