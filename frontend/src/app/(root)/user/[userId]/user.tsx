'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { PostCard } from '@/components/shared';
import { Loader } from '@/components/shared/loader';
import { UsersList } from '@/components/shared/users-list';
import { Separator } from '@/components/ui';

import { useGetUser } from '@/hooks/queries/user/use-get-user';
import { useGetUsers } from '@/hooks/queries/user/use-get-users';
import { useProfile } from '@/hooks/use-profile';

interface Props {
	userId: string;
}

export function User({ userId }: Props) {
	const { isLoading: isProfileLoading, user: currentUser } = useProfile();
	const { isLoading: isUserLoading, user } = useGetUser(userId);
	const { users, isLoading: isUsersLoading } = useGetUsers();
	const excludedCurrentUserUsers = users?.filter((i) => i.id !== user?.id);

	if (isProfileLoading || isUserLoading || isUsersLoading) {
		return <Loader absolute />;
	}

	if (!user || !currentUser || excludedCurrentUserUsers === undefined) {
		return notFound();
	}

	return (
		<div>
			<div className={'space-y-4 px-6 py-4'}>
				<div className={'flex items-center justify-between'}>
					<div>
						<h1 className={'text-2xl font-bold'}>{user.username}</h1>
						<p className={'text-muted-foreground'}>{user.email}</p>
					</div>

					<Image
						className={'rounded-full border object-cover'}
						src={user.avatar}
						alt={user.avatar}
						width={84}
						height={84}
						priority
					/>
				</div>

				{/*{currentUser.id === user.id && (*/}
				{/*	<Button variant={'outline'} size={'sm'} className={'w-full'}>*/}
				{/*		Редактировать профиль*/}
				{/*	</Button>*/}
				{/*)}*/}
			</div>

			{excludedCurrentUserUsers.length > 0 && (
				<>
					<Separator />

					<h4 className={'font-medium py-2 px-6 bg-neutral-950/20'}>
						Присоединяйтесь к новым друзьям! 🤪
					</h4>

					<Separator />
					<section className={'px-6 py-4'}>
						<UsersList users={excludedCurrentUserUsers} />
					</section>
				</>
			)}

			<div>
				<Separator />

				{user.posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
