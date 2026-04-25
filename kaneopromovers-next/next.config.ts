import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kaneopromovers.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
  },

  /* Security Headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },

  /* 301 Redirects — preserve SEO from old static site */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/quote.html", destination: "/quote", permanent: true },
      { source: "/success.html", destination: "/success", permanent: true },
      {
        source: "/moving-services.html",
        destination: "/moving-services",
        permanent: true,
      },
      {
        source: "/moving-services-details.html",
        destination: "/moving-services/details",
        permanent: true,
      },
      {
        source: "/airdrie-movers.html",
        destination: "/locations/airdrie",
        permanent: true,
      },
      {
        source: "/calgary-movers.html",
        destination: "/locations/calgary",
        permanent: true,
      },
      {
        source: "/crossfield-movers.html",
        destination: "/locations/crossfield",
        permanent: true,
      },
      {
        source: "/carstairs-movers.html",
        destination: "/locations/carstairs",
        permanent: true,
      },
      {
        source: "/chestermere-movers.html",
        destination: "/locations/chestermere",
        permanent: true,
      },
      {
        source: "/cochrane-movers.html",
        destination: "/locations/cochrane",
        permanent: true,
      },
      {
        source: "/okotoks-movers.html",
        destination: "/locations/okotoks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
