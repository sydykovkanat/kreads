import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { userService } from '@/services/user.service';

export function useGetUser(id: string) {
	const { data: user, isLoading } = useQuery({
		queryKey: ['get user'],
		queryFn: () => userService.getById(id),
		staleTime: 0,
		refetchOnWindowFocus: false,
	});

	return useMemo(() => ({ user, isLoading }), [user, isLoading]);
}
