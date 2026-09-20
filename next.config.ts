import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server actions ontvangen de project-PDF (base64) als bijlage — ruimer dan 1MB.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  /**
   * Eén canoniek domein (SEO-plan §2): kozijnstudio.com → www.kozijnstudio.com.
   * Voorkomt dat dezelfde pagina op twee adressen geïndexeerd wordt.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kozijnstudio.com" }],
        destination: "https://www.kozijnstudio.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
