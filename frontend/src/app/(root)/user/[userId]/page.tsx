import { Metadata } from 'next';

import { User } from '@/app/(root)/user/[userId]/user';

import { userService } from '@/services/user.service';

interface Props {
	params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { userId } = await params;

	const user = await userService.getById(userId);

	return {
		title: `@${user.username}`,
	};
}

export default async function Page({ params }: Props) {
	const { userId } = await params;

	return <User userId={userId} />;
}
