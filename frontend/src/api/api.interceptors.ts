import axios, { type CreateAxiosDefaults } from 'axios';

import { errCatch } from '@/api/api.helper';

import { SERVER_URL } from '@/config/api.config';

import {
	getAccessToken,
	removeFromStorage,
} from '@/services/auth/auth-token.service';
import { authService } from '@/services/auth/auth.service';

const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = getAccessToken();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuth.interceptors.response.use(
	(config) => config,
	async (err) => {
		const originalRequest = err.config;

		if (
			(err?.response?.status === 401 ||
				errCatch(err) === 'jwt expired' ||
				errCatch(err) === 'jwt must be provided') &&
			err.config &&
			!err.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				await authService.getNewTokens();

				return axiosWithAuth.request(originalRequest);
			} catch (err) {
				if (errCatch(err) === 'jwt expired') {
					removeFromStorage();
				}
			}
		}
		throw err;
	},
);

export { axiosWithAuth, axiosClassic };
