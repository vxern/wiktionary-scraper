import { ScraperOptions } from "../options.js";

/** Defines the links used in querying Wiktionary. */
interface Links {
	/**
	 * Generates a link pointing to a word entry.
	 *
	 * @defaultValue `https://${options.siteLanguage}.wiktionary.org/wiki/${word}#${options.lemmaLanguage}`
	 */
	definition: (word: string, options: ScraperOptions) => string;
}

const links: Links = {
	definition: (word: string, options: ScraperOptions): string =>
		`https://${options.siteLanguage}.wiktionary.org/wiki/${encodeURIComponent(word)}#${encodeURIComponent(
			options.lemmaLanguage,
		)}`,
};

export type { Links };
export default links;
