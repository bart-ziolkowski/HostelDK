/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/hosteldk",
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiYmFydC16aW9sa293c2tpIiwiYSI6ImNsdjlpbWJ5eTBoNGoyaXA4MGNwbW9xeDEifQ.Ag5FV6LEfCsYptZOdZQJrA",
    DB_URI: "",
   
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
