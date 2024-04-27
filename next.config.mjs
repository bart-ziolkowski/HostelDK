/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://hosteldk.vercel.app",
    DB_URI:
      "mongodb+srv://vercel-admin-user:pNJT8inUdHj3uoeM@hosteldk.pftwzmb.mongodb.net/hosteldk?retryWrites=true&w=majority",
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
