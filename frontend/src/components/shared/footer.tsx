'use client';

import { HomeIcon, PlusIcon, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';

import { CreatePostDialog } from '@/components/shared';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui';

import { useProfile } from '@/hooks/use-profile';

export function Footer() {
	const { user, isLoading } = useProfile();

	return (
		<div
			className={
				'sticky bottom-0 mt-4 rounded-t-3xl border-y-[0.5px] border-x-[0.5px] bg-neutral-900/90 backdrop-blur-lg max-w-max p-2 flex justify-center gap-x-10 items-center mx-auto'
			}
		>
			<Link href={'/'}>
				<Button
					size={'lg'}
					variant={'secondary'}
					className={
						'border text-muted-foreground rounded-full bg-secondary/50 backdrop-blur-2xl'
					}
				>
					<HomeIcon />
				</Button>
			</Link>

			<CreatePostDialog>
				<Button
					size={'lg'}
					variant={'secondary'}
					className={
						'border text-muted-foreground rounded-full bg-secondary/50 backdrop-blur-2xl'
					}
				>
					<PlusIcon />
				</Button>
			</CreatePostDialog>

			{isLoading ? (
				<div className={'h-12 w-[50px] grid place-items-center'}>
					<Loader />
				</div>
			) : (
				!isLoading &&
				user && (
					<Link href={`/user/${user.id}`}>
						<Button
							size={'lg'}
							variant={'secondary'}
							className={
								'border text-muted-foreground rounded-full bg-secondary/50 backdrop-blur-2xl'
							}
						>
							<UserRoundIcon />
						</Button>
					</Link>
				)
			)}
		</div>
	);
}
