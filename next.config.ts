import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"], // include md/mdx as pages
  experimental: {
    turbo: false, // 👈 disable Turbopack
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
