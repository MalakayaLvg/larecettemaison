import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Episode covers come from the Ausha RSS feed. Their URLs carry a ?t= cache-buster,
    // so `search` is left out (the `new URL()` form would require an empty query).
    remotePatterns: [{ protocol: "https", hostname: "image.ausha.co" }],
  },
};

export default nextConfig;
