/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://hosteldk.vercel.app",
    DB_URI:
      "mongodb+srv://vercel-admin-user:pNJT8inUdHj3uoeM@hosteldk.pftwzmb.mongodb.net/hosteldk?retryWrites=true&w=majority",
    NEXTAUTH_URL: "https://hosteldk.vercel.app",
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiYmFydC16aW9sa293c2tpIiwiYSI6ImNsdjlpbWJ5eTBoNGoyaXA4MGNwbW9xeDEifQ.Ag5FV6LEfCsYptZOdZQJrA",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
