import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        SECRET: process.env.SECRET,
    },
};

export default nextConfig;
