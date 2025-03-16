import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';

export default function NotFound() {
	return (
		<div
			className={
				'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center flex flex-col gap-2'
			}
		>
			<h1 className={'text-xl'}>Упс, страница не найдена 😅</h1>

			<Link href={'/'}>
				<Button variant={'outline'} size={'sm'}>
					<ArrowLeftIcon /> На главную
				</Button>
			</Link>
		</div>
	);
}
