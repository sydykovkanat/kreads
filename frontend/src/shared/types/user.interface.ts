import { IPost } from '@/shared/types/post.interface';

export interface IUser {
	id: string;
	createdAt: string;
	updatedAt: string;

	email: string;
	username: string;
	avatar: string;

	posts: IPost[];
}
