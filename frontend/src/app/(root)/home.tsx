'use client';

import { notFound } from 'next/navigation';

import { PostCard } from '@/components/shared';
import { Loader } from '@/components/shared/loader';

import { useGetPosts } from '@/hooks/queries/post/use-get-posts';

export function Home() {
	const { posts, isLoading: isPostLoading } = useGetPosts();

	if (isPostLoading) {
		return <Loader absolute />;
	}

	if (!posts) {
		return notFound();
	}

	return (
		<div>
			{posts.length === 0 ? (
				<p
					className={
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground'
					}
				>
					Список постов пуст 😭
				</p>
			) : (
				posts.map((post) => <PostCard key={post.id} post={post} />)
			)}
		</div>
	);
}
