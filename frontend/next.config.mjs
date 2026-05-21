/** @type {import('next').NextConfig} */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tell Next.js where the workspace root is so Vercel/Next inference is correct
  outputFileTracingRoot: path.join(__dirname, '..'),
};

export default nextConfig;
