export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diff < 60) return 'только что.';
	if (diff < 3600) return `${Math.floor(diff / 60)} мин.`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} ч.`;
	if (diff < 604800) return `${Math.floor(diff / 86400)} дн.`;

	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}
