import { IUser } from '@/shared/types/user.interface';

export interface IAuthForm {
	username: string;
	email: string;
	password: string;
	avatar: File;
}

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
}
