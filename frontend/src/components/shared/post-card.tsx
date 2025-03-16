import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '@/components/shared';
import { ScrollArea, ScrollBar } from '@/components/ui';

import { IPost } from '@/shared/types/post.interface';

import { formatDate } from '@/utils/format-date';

interface Props {
	post: IPost;
}

export function PostCard({ post }: Props) {
	return (
		<div
			className={
				'px-3 sm:px-6 py-3 border-b last-of-type:border-b-0 flex gap-x-2'
			}
		>
			<div className='shrink-0'>
				<Link href={`/user/${post.user.id}`} className={'font-semibold'}>
					<Avatar src={post.user.avatar} />
				</Link>
			</div>

			<div className={'space-y-1.5'}>
				<div className={'flex gap-2 leading-none'}>
					<Link
						href={`/user/${post.user.id}`}
						className={'font-semibold hover:underline'}
					>
						{post.user.username}
					</Link>

					<p className={'text-muted-foreground'}>
						{formatDate(post.createdAt)}
					</p>
				</div>

				<div>
					<p
						className={'break-all hyphens-manual'}
						style={{
							marginBottom: post.images.length > 0 ? '8px' : 0,
						}}
					>
						{post.content}
					</p>

					{post.images.length > 0 && (
						<ScrollArea className={'w-full rounded-xl pb-3'}>
							<div className={'flex gap-x-4'}>
								{post.images.map((item) => (
									<Image
										key={item}
										src={item}
										alt={item}
										width={200}
										height={300}
										className={
											'block aspect-auto object-cover size-auto rounded-xl border'
										}
										priority
									/>
								))}
							</div>

							<ScrollBar orientation={'horizontal'} />
						</ScrollArea>
					)}
				</div>
			</div>
		</div>
	);
}
