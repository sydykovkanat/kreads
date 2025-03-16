import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { postService } from '@/services/post.service';

export function useGetPosts() {
	const { data: posts, isLoading } = useQuery({
		queryKey: ['get posts'],
		queryFn: () => postService.getAll(),
		staleTime: 0,
		refetchInterval: 5000,
		refetchOnWindowFocus: false,
	});

	return useMemo(() => ({ posts, isLoading }), [posts, isLoading]);
}
