import Image from 'next/image';

interface Props {
	src: string;
	alt?: string;
}

export function Avatar({ src, alt }: Props) {
	return (
		<Image
			src={src}
			alt={`image alt ${alt}`}
			width={40}
			height={40}
			className='block w-[40px] h-[40px] object-cover rounded-full border'
			priority
		/>
	);
}
