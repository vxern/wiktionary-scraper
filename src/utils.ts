import constants from "./constants/constants.js";

export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

type Reverse<O extends Record<string, string>> = {
	[K in keyof O as O[K]]: K;
};
export function getReversed<Keys extends string, O extends Record<Keys, string>>(object: O): Reverse<O> {
	const reversed: Partial<Reverse<O>> = {};

	for (const key of Object.keys(object) as Keys[]) {
		const value = object[key];
		if (value in reversed) {
			throw "Duplicate values.";
		}

		// @ts-ignore: This is okay.
		reversed[value] = key;
	}

	return reversed as unknown as Reverse<O>;
}

export function getFilled<Keys extends string, O extends Record<Keys, unknown>>(objectRaw: O, source: O): O {
	const object = structuredClone(objectRaw) as O;

	for (const key of Object.keys(source) as Keys[]) {
		if (!(key in object)) {
			object[key] = source[key];
			continue;
		}

		const value = object[key];

		if (Array.isArray(value)) {
			for (const element of source[key] as []) {
				value.push(element);
			}

			continue;
		}

		if (typeof value === "object") {
			// @ts-ignore: This is fine.
			object[key] = getFilled(value, source[key]);
		}
	}

	return object;
}

export function getCleaned(string: string): string {
	return (
		string
			.trim()
			.replaceAll(constants.patterns.multipleWhitespace, " ")
			// biome-ignore lint/suspicious/noControlCharactersInRegex: This is fine.
			.replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, "")
	);
}
