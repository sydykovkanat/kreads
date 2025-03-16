'use client';

import { notFound } from 'next/navigation';

import { PostCard } from '@/components/shared';
import { Loader } from '@/components/shared/loader';

import { useGetPosts } from '@/hooks/queries/post/use-get-posts';

export function Home() {
	const { posts, isLoading } = useGetPosts();

	if (isLoading) {
		return <Loader absolute />;
	}

	if (!posts) {
		return notFound();
	}

	return (
		<div>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
