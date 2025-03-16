export const APP_URL = process.env.APP_URL as string;

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	posts: (url = '') => PUBLIC_URL.root(`/posts${url ? url : ''}`),
};
