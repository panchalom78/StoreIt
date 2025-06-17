import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: "100MB",
        },
    },
    images: {
        // domains: ["thumbs.dreamstime.com", "fra.cloud.appwrite.io"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fra.cloud.appwrite.io",
                pathname: "/v1/storage/buckets/**",
            },
            {
                protocol: "https",
                hostname: "thumbs.dreamstime.com",
                pathname: "/b/**",
            },
        ],
    },
};

export default nextConfig;
