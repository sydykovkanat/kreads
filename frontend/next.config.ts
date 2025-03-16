import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	env: {
		APP_ENV: process.env.APP_ENV,
		APP_URL: process.env.APP_URL,
		APP_DOMAIN: process.env.APP_DOMAIN,
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'kreads-uploads.s3.eu-north-1.amazonaws.com',
			},
		],
	},
};

export default nextConfig;
