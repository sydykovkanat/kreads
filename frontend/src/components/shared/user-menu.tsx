import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { authService } from '@/services/auth/auth.service';

import { IUser } from '@/shared/types/user.interface';

interface Props extends PropsWithChildren {
	user: IUser;
}

export function UserMenu({ user, children }: Props) {
	const router = useRouter();

	const handleLogout = async () => {
		await authService.logout();
		router.push('/auth');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOutIcon /> Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
