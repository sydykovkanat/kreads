import { PropsWithChildren } from 'react';

import { cn } from '@/utils/clsx';

interface Props extends PropsWithChildren {
	className?: string;
}

export function Container({ className, children }: Props) {
	return (
		<div
			className={cn(
				'max-w-[640px] py-2 relative border-[0.5px] border-b-0 overflow-hidden min-h-dvh mx-auto bg-neutral-900 rounded-t-3xl',
				className,
			)}
		>
			{children}
		</div>
	);
}
