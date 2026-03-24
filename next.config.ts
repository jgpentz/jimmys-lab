import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
