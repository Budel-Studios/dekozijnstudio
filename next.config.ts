import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server actions ontvangen de project-PDF (base64) als bijlage — ruimer dan 1MB.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
