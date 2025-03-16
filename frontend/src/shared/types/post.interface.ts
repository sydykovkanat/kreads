import { IUser } from '@/shared/types/user.interface';

export interface IPost {
	id: string;

	content: string;
	images: string[];

	userId: string;
	user: IUser;

	createdAt: string;
	updatedAt: string;
}

export interface IPostInput extends Pick<IPost, 'content'> {
	images: File[];
}
