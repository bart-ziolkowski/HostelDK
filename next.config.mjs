/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DBI_LOCAL_URI: "mongodb://localhost:27017/hosteldk",
    DBI_URI: "",
  },
};

export default nextConfig;
