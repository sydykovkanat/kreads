import Image from 'next/image';

import { cn } from '@/utils/clsx';

interface Props {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
	className?: string;
}

export function Avatar({ src, alt, width, height, className }: Props) {
	const wSize = width ? width : 40;
	const hSize = height ? height : 40;

	return (
		<Image
			src={src}
			alt={`image alt ${alt}`}
			width={wSize}
			height={hSize}
			className={cn(
				`block w-[${wSize}px] h-[${hSize}px] object-cover rounded-full border`,
				className,
			)}
			priority
		/>
	);
}
