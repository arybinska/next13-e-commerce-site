/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "tailwindui.com",
      ],
      formats: ["image/avif", "image/webp"],
    },
}

module.exports = nextConfig
