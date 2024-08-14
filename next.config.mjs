import pwa from 'next-pwa'

const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
});

export default nextConfig;
