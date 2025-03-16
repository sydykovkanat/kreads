'use client';

import { useState } from 'react';

import { useAuthForm } from '@/app/auth/use-auth-form';

import { AuthFields } from '@/components/shared';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Form,
} from '@/components/ui';

export function Auth() {
	const [isReg, setIsReg] = useState(false);

	const { isPending, onSubmit, form } = useAuthForm(isReg);

	return (
		<div className={'w-full min-h-dvh flex justify-center items-center'}>
			<Card className={'max-w-[480px] w-full'}>
				<CardHeader className={'gap-x-2 items-center leading-none'}>
					<p className={'text-4xl'}>🌸</p>

					<div>
						<CardTitle>
							{isReg ? 'Создать аккаунт' : 'Войти в учетную запись'}
						</CardTitle>
						<CardDescription>
							Заполните поля, чтобы {isReg ? 'создать' : 'войти в'} учетную
							запись
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className={'space-y-4'}
						>
							<AuthFields form={form} isPending={isPending} isReg={isReg} />

							<Button className={'w-full'} size={'lg'} disabled={isPending}>
								{isReg ? 'Создать' : 'Войти'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className={'text-muted-foreground'}>
					{isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}&nbsp;
					<button
						className={'underline text-foreground'}
						onClick={() => setIsReg((prev) => !prev)}
					>
						{isReg ? 'Войти' : 'Создать'}
					</button>
				</CardFooter>
			</Card>
		</div>
	);
}
