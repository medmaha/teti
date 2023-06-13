import serialize from 'serialize-javascript';

export function session(): any {
	return {
		// ...
		serialize(data: any): any {
			return serialize(data);
		}
	};
}
