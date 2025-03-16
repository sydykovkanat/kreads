import { ImagePlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
	Button,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	ScrollArea,
	ScrollBar,
	Textarea,
} from '@/components/ui';

import { IPostInput } from '@/shared/types/post.interface';

interface Props {
	form: UseFormReturn<IPostInput>;
	isLoadingCreate: boolean;
	handleClickUpload: () => void;
	imagePreviews: string[];
	handleDeleteImage: (index: number) => void;
	imageInputRef: RefObject<HTMLInputElement | null>;
	handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CreatePostFields({
	form,
	isLoadingCreate,
	handleClickUpload,
	imagePreviews,
	handleDeleteImage,
	handleFileChange,
	imageInputRef,
}: Props) {
	return (
		<>
			<FormField
				control={form.control}
				name={'content'}
				rules={{
					required: 'Контент обязателен',
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Textarea
								className={'h-40 placeholder:text-sm'}
								placeholder={'О чем думаете?'}
								disabled={isLoadingCreate}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<Button
				onClick={handleClickUpload}
				type={'button'}
				variant={'outline'}
				className={'mt-2'}
			>
				Прикрепить фотографии <ImagePlusIcon />
			</Button>

			<ScrollArea className={'w-full'}>
				<div className='flex gap-x-4 mt-2 pb-3'>
					{imagePreviews.map((imageUrl, index) => (
						<div key={index} className='relative flex size-[100px]'>
							<Image
								src={imageUrl}
								alt={`image-${index + 1}`}
								width={200}
								height={200}
								className={'block object-cover rounded-xl border'}
							/>
							<button
								type='button'
								onClick={() => handleDeleteImage(index)}
								className='absolute top-2 right-2 size-8 flex justify-center items-center rounded-lg border bg-neutral-900'
							>
								<Trash2Icon className={'size-5 stroke-[1.25]'} />
							</button>
						</div>
					))}
				</div>

				<ScrollBar orientation={'horizontal'} />
			</ScrollArea>

			<FormField
				control={form.control}
				name={'images'}
				render={() => (
					<FormItem>
						<FormControl>
							<Input
								className={'sr-only'}
								type={'file'}
								ref={imageInputRef}
								disabled={isLoadingCreate}
								onChange={handleFileChange}
								multiple
								accept={'image/*'}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
