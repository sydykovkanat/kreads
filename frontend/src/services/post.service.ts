import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors';

import { API_URL } from '@/config/api.config';

import { IPost } from '@/shared/types/post.interface';

class PostService {
	async getAll() {
		const { data } = await axiosClassic<IPost[]>({
			url: API_URL.posts(),
			method: 'GET',
		});

		return data;
	}

	async getById(id: string) {
		const { data } = await axiosClassic<IPost>({
			url: API_URL.posts(`/${id}`),
			method: 'GET',
		});

		return data;
	}

	async create(data: FormData) {
		const { data: createdPost } = await axiosWithAuth<IPost>({
			url: API_URL.posts(),
			method: 'POST',
			data,
		});

		return createdPost;
	}
}

export const postService = new PostService();
