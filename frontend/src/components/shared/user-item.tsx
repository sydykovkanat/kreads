import Link from 'next/link';

import { Avatar } from '@/components/shared/avatar';
import { CardTitle } from '@/components/ui';

import { IUser } from '@/shared/types/user.interface';

interface Props {
	user: IUser;
}

export function UserItem({ user }: Props) {
	return (
		<Link href={`/user/${user.id}`}>
			<div
				key={user.id}
				className={
					'flex bg-secondary/50 flex-col gap-y-2 items-center text-center w-max border rounded-xl p-4'
				}
			>
				<div>
					<Avatar
						src={user.avatar}
						alt={user.username}
						width={80}
						height={80}
					/>
				</div>

				<div className={'space-y-2'}>
					<CardTitle>{user.username}</CardTitle>
				</div>
			</div>
		</Link>
	);
}
