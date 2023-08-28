import patterns from "./constants/patterns.js";

type Reverse<O extends Record<string, string>> = {
	[K in keyof O as O[K]]: K;
};
export function reverseObject<O extends Record<string, string>>(object: O): Reverse<O> {
	const reversed: Partial<Reverse<O>> = {};
	for (const key of Object.keys(object) as (keyof O)[]) {
		// @ts-ignore: This is okay.
		reversed[object[key]] = key;
	}
	return reversed as unknown as Reverse<O>;
}

export function addMissingProperties<O extends Record<string, unknown>>(object: O, from: O): O {
	for (const key of Object.keys(from) as (keyof O)[]) {
		if (!(key in object)) {
			object[key] = from[key];
		} else if (Array.isArray(object[key])) {
			for (const element of from[key] as []) {
				(object[key] as []).push(element);
			}
		} else if (typeof object[key] === "object") {
			addMissingProperties(object[key] as Record<string, unknown>, from[key] as Record<string, unknown>);
		}
	}

	return object;
}

export function clean(string: string): string {
	return string.trim().replaceAll(patterns.multipleWhitespace, " ");
}
