import { Metadata } from 'next';

import { Auth } from '@/app/auth/auth';

export const metadata: Metadata = {
	title: 'Авторизация',
};

export default function Page() {
	return <Auth />;
}
