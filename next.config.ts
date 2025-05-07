
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Allow picsum.photos for placeholder images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all hostnames (less secure, consider restricting if possible)
        port: '',
        pathname: '/**',
      },
    ],
    // Allow data URIs for uploaded images
    dangerouslyAllowSVG: true, // if you plan to use SVGs in data URIs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Basic CSP for data URIs
  },
};

export default nextConfig;
