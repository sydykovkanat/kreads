'use client';

import { Avatar } from '@/components/shared/avatar';
import { Loader } from '@/components/shared/loader';
import { UserMenu } from '@/components/shared/user-menu';
import { Button } from '@/components/ui';

import { useProfile } from '@/hooks/use-profile';

export function Header() {
	const { user } = useProfile();

	return (
		<header
			className={
				'max-w-[640px] mx-auto justify-end px-6 flex items-center h-[60px]'
			}
		>
			<h4
				className={
					'cursor-pointer text-center font-semibold absolute left-1/2 -translate-x-1/2'
				}
				onClick={() => {
					window.location.reload();
				}}
			>
				kreads 🌸
			</h4>

			<div className={'size-10 grid place-items-center'}>
				{user && (
					<UserMenu user={user}>
						<div>
							<Avatar src={user.avatar} alt={user.username} />
						</div>
					</UserMenu>
				)}
			</div>
		</header>
	);
}
