import { UserItem } from '@/components/shared/user-item';
import { ScrollArea, ScrollBar } from '@/components/ui';

import { IUser } from '@/shared/types/user.interface';

interface Props {
	users: IUser[];
}

export function UsersList({ users }: Props) {
	return (
		<ScrollArea>
			<div className={'flex gap-x-3'}>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>

			<ScrollBar orientation={'horizontal'} />
		</ScrollArea>
	);
}
