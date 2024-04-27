/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://hosteldk.vercel.app",
    SMTP_PASSWORD: "0516fde7a867e3",
    SMTP_PORT: 2525,
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiYmFydC16aW9sa293c2tpIiwiYSI6ImNsdjlpbWJ5eTBoNGoyaXA4MGNwbW9xeDEifQ.Ag5FV6LEfCsYptZOdZQJrA",
    CLOUDINARY_API_KEY: 177238823964242,
    DB_URI:
      "mongodb+srv://vercel-admin-user:pNJT8inUdHj3uoeM@hosteldk.pftwzmb.mongodb.net/hosteldk?retryWrites=true&w=majority",
    SMTP_FROM_EMAIL: "noreply@hosteldk.dk",
    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    CLOUDINARY_API_SECRET: "GLsXhOLw6hkmAkBaUG-JTI3-ne8",
    NEXTAUTH_URL: "https://hosteldk.vercel.app",
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
