import { Metadata } from 'next';

import { Home } from '@/app/(root)/home';

export const metadata: Metadata = {
	title: 'Главная',
};

export default function Page() {
	return <Home />;
}
