import { PlusIcon } from 'lucide-react';

import { CreatePostDialog } from '@/components/shared';
import { Button } from '@/components/ui';

export function Footer() {
	return (
		<div
			className={
				'sticky bottom-0 border-y-[0.5px] border-x-[0.5px] bg-neutral-900/90 backdrop-blur-lg w-full p-2 flex justify-center gap-x-10 items-center mx-auto max-w-[640px]'
			}
		>
			<CreatePostDialog>
				<Button
					size={'lg'}
					variant={'secondary'}
					className={'border bg-secondary/10 backdrop-blur-2xl'}
				>
					<PlusIcon />
				</Button>
			</CreatePostDialog>
		</div>
	);
}
