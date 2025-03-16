import React, { PropsWithChildren } from 'react';

import { Container, Header } from '@/components/shared';
import { Footer } from '@/components/shared/footer';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />

			<Container>{children}</Container>

			<Footer />
		</>
	);
}
