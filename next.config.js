/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "file1.batdongsan.com.vn",
      "file4.batdongsan.com.vn",
      "sprudge.com",
      "realestate.usnews.com",
      "images.adsttc.com",
      "www.build-review.com",
      "res.cloudinary.com",
      "tailwindui.com",
    ],
  },
}

module.exports = nextConfig
