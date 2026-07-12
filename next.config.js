/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // trailing slash agar path file HTML kompatibel dengan cPanel hosting
  trailingSlash: true,
  // nonaktifkan Image Optimization karena tidak tersedia di static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
