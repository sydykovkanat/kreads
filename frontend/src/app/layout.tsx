import type { Metadata } from 'next';
import React, { ReactNode } from 'react';

import { Providers } from '@/app/providers';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

import './globals.css';

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s • ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang={'ru'} className={'dark'}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
