import { Loader as LoaderIcon } from 'lucide-react';

import { cn } from '@/utils/clsx';

interface Props {
	absolute?: boolean;
	className?: string;
}

export function Loader({ absolute, className }: Props) {
	return (
		<div
			className={cn(className, {
				'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': absolute,
			})}
		>
			<LoaderIcon
				className={'text-muted-foreground size-5 animate-spin stroke-[1.5]'}
			/>
		</div>
	);
}
