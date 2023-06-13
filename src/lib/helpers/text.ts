export function capitalize(text: string): string {
	const string = text.toLowerCase().split('');
	string[0] = string[0].toUpperCase();
	return string.join('');
}

export function normalize(text: string): string {
	const string = text.toLowerCase().replace(' ', '-').replace(new RegExp('_/'), '');
	return string;
}
