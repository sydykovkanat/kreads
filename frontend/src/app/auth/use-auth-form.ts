import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { PUBLIC_URL } from '@/config/url.config';

import { authService } from '@/services/auth/auth.service';

import { IAuthForm } from '@/shared/types/auth.interface';

export function useAuthForm(isReg: boolean) {
	const router = useRouter();

	const form = useForm<IAuthForm>({
		mode: 'onSubmit',
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth user'],
		mutationFn: async (data: IAuthForm) =>
			authService.main(isReg ? 'register' : 'login', data),
		onSuccess: () => {
			form.reset();
			toast.success('Успешная авторизация 🌸');
			router.replace(PUBLIC_URL.home());
		},
		onError: (err: any) => {
			if (err.message) {
				toast.error(err.response.data.message);
			} else {
				toast.error('Ошибка при авторизации');
			}
		},
	});

	const onSubmit: SubmitHandler<IAuthForm> = (data) => {
		mutate(data);
	};

	return { onSubmit, form, isPending };
}
