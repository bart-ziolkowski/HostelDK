/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/hosteldk",
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiYmFydC16aW9sa293c2tpIiwiYSI6ImNsdjlpbWJ5eTBoNGoyaXA4MGNwbW9xeDEifQ.Ag5FV6LEfCsYptZOdZQJrA",
    DB_URI:
      "mongodb+srv://bart-ziolkowski:Meybiksong2016@@hosteldk.pftwzmb.mongodb.net/hosteldk?retryWrites=true&w=majority&appName=hosteldk",
    REVALIDATE_DATA_TOKEN:
      "NPCNPQWNPWEFEWFWFWEFWEFWEEGRBRGVRGETBETVNP3NP1143P1241",
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
