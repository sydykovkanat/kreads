import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { userService } from '@/services/user.service';

export function useGetUsers() {
	const { data: users, isLoading } = useQuery({
		queryKey: ['get users'],
		queryFn: () => userService.getAll(),
		staleTime: 0,
		refetchOnWindowFocus: false,
	});

	return useMemo(() => ({ users, isLoading }), [users, isLoading]);
}
