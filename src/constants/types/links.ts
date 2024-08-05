import type { ScraperOptions } from "../../options.js";

export default {
	definition: (word: string, options: ScraperOptions): string =>
		`https://${options.siteLanguage}.wiktionary.org/wiki/${word}#${options.lemmaLanguage}`,
};
