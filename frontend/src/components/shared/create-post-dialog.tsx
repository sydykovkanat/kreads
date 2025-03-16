'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ImagePlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, PropsWithChildren, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CreatePostFields } from '@/components/shared/create-post-fields';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	ScrollArea,
	ScrollBar,
	Textarea,
} from '@/components/ui';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import { useCreatePost } from '@/hooks/queries/post/use-create-post';

import { IPostInput } from '@/shared/types/post.interface';

export function CreatePostDialog({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);

	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);

	const { isLoadingCreate, createPost } = useCreatePost();
	const queryClient = useQueryClient();

	const form = useForm<IPostInput>({
		mode: 'onSubmit',
		defaultValues: {
			content: '',
			images: [],
		},
	});

	const onSubmit: SubmitHandler<IPostInput> = (data) => {
		const formData = new FormData();
		formData.append('content', data.content);

		if (data.images.length > 0) {
			data.images.forEach((file) => {
				formData.append('images', file);
			});
		}

		createPost(formData);

		setIsOpen(false);
		form.reset();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files).map((file) => {
				const extension = file.name.split('.').pop();
				const newFileName = `${new Date().toISOString().replace(/[:.]/g, '-')}.${extension}`;
				return new File([file], newFileName, { type: file.type });
			});

			form.setValue('images', files);
			const previews = files.map((file) => URL.createObjectURL(file));
			setImagePreviews(previews);
		}
	};

	const handleClickUpload = () => {
		imageInputRef?.current?.click();
	};

	const handleDeleteImage = (index: number) => {
		const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
		setImagePreviews(updatedPreviews);

		const updatedFiles = form.getValues('images').filter((_, i) => i !== index);
		form.setValue('images', updatedFiles);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent
				className={'max-w-[600px] mx-auto bg-neutral-900/80 backdrop-blur-2xl'}
			>
				<Form {...form}>
					<DrawerHeader>
						<DrawerTitle>Новый пост 🎀</DrawerTitle>
						<DrawerDescription>
							Заполните все поля, чтобы создать новый пост
						</DrawerDescription>
					</DrawerHeader>

					<form onSubmit={form.handleSubmit(onSubmit)} className={'px-4'}>
						<CreatePostFields
							form={form}
							handleClickUpload={handleClickUpload}
							handleDeleteImage={handleDeleteImage}
							handleFileChange={handleFileChange}
							imageInputRef={imageInputRef}
							imagePreviews={imagePreviews}
							isLoadingCreate={isLoadingCreate}
						/>

						<DrawerFooter className={'px-0'}>
							<Button className={'h-11'} disabled={isLoadingCreate}>
								Опубликовать 👌
							</Button>
							<DrawerClose asChild>
								<Button className={'h-11'} variant='outline'>
									Закрыть ❌
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</Form>
			</DrawerContent>
		</Drawer>
	);
}
