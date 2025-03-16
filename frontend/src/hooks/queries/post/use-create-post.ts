import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { postService } from '@/services/post.service';

export function useCreatePost() {
	const queryClient = useQueryClient();

	const { mutate: createPost, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create post'],
		mutationFn: (data: FormData) => postService.create(data),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			});

			await queryClient.invalidateQueries({
				queryKey: ['get posts'],
			});

			queryClient.invalidateQueries({
				queryKey: ['get user'],
			});

			toast.success('Пост успешно опубликован');
		},
		onError: () => {
			toast.error('Ошибка при публикации поста');
		},
	});
	return useMemo(
		() => ({ createPost, isLoadingCreate }),
		[createPost, isLoadingCreate],
	);
}
