export const getContentType = () => ({
	'Content-type': 'application/json',
});

export const errCatch = (err: any): string => {
	const message = err?.response?.data?.message;

	return message
		? typeof err.response.data.message === 'object'
			? message[0]
			: message
		: err.message;
};
