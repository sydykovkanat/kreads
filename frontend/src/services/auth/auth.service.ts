import { axiosClassic } from '@/api/api.interceptors';

import { API_URL } from '@/config/api.config';

import {
	removeFromStorage,
	saveTokenStorage,
} from '@/services/auth/auth-token.service';

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface';

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const isLogin = type === 'login';

		console.log(data);

		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/${type}`),
			method: 'POST',
			data: isLogin ? data : this.toFormData(data),
		});

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	private toFormData(data: Record<string, any>) {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		return formData;
	}

	async getNewTokens() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('/login/access-token'),
			method: 'POST',
		});

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	async logout() {
		const response = await axiosClassic<boolean>({
			url: API_URL.auth('/logout'),
			method: 'POST',
		});

		if (response.data) {
			removeFromStorage();
		}

		return response;
	}
}

export const authService = new AuthService();
