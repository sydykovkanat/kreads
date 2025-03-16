import { UseFormReturn } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';

import { validEmail } from '@/shared/regex';
import { IAuthForm } from '@/shared/types/auth.interface';

interface Props {
	form: UseFormReturn<IAuthForm>;
	isPending: boolean;
	isReg?: boolean;
}

export function AuthFields({ form, isPending, isReg }: Props) {
	return (
		<>
			{isReg && (
				<>
					<FormField
						control={form.control}
						name={'username'}
						rules={{
							required: 'Имя пользователя обязательно',
							minLength: {
								value: 3,
								message: 'Имя пользователя должно содержать минимум 3 символа',
							},
							maxLength: {
								value: 20,
								message: 'Имя пользователя не должно превышать 20 символов',
							},
							pattern: {
								value: /^[a-zA-Z0-9_]+$/,
								message: 'Допустимы только англ. буквы, цифры и символ "_"',
							},
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя пользователя</FormLabel>
								<FormControl>
									<Input
										placeholder={'Имя пользователя'}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='avatar'
						rules={{ required: 'Фотография обязательна' }}
						render={() => (
							<FormItem>
								<FormLabel>Аватарка</FormLabel>
								<FormControl>
									<Input
										type='file'
										placeholder='Фотография'
										disabled={isPending}
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file) {
												const extension = file.name.split('.').pop();
												const newFileName = `${new Date().toISOString().replace(/[:.]/g, '-')}.${extension}`;

												const newFile = new File([file], newFileName, {
													type: file.type,
												});

												form.setValue('avatar', newFile);
											}
										}}
										accept={'image/*'}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</>
			)}

			<FormField
				control={form.control}
				name={'email'}
				rules={{
					required: 'Почта обязательно',
					pattern: {
						value: validEmail,
						message: 'Введите корректную почту',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Почта</FormLabel>
						<FormControl>
							<Input
								placeholder={'example@mail.com'}
								type={'email'}
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name={'password'}
				rules={{
					required: 'Пароль обязательно',
					minLength: {
						value: 6,
						message: 'Минимум 6 символов',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Пароль</FormLabel>
						<FormControl>
							<Input
								type={'password'}
								placeholder={isReg ? 'Придумайте пароль' : 'Введите пароль'}
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
