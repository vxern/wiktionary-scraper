import * as cheerio from "cheerio";
import links from "./constants/links.js";
import selectors from "./constants/selectors.js";
import { ScraperOptions } from "./options.js";
import { parse } from "./parsers/parser.js";
import { Entry } from "./types.js";

const defaultScraperOptions: ScraperOptions = {
	lemmaLanguage: "English",
	siteLanguage: "en",
	userAgent: "wiktionary-scraper (github.com/vxern/wiktionary-scraper)",
	followRedirect: false,
} as const;

export async function get(
	lemma: string,
	options: Partial<ScraperOptions> = defaultScraperOptions,
): Promise<Entry[] | undefined> {
	const optionsFilled: ScraperOptions = { ...defaultScraperOptions, ...options };

	let response;
	try {
		response = await fetch(links.definition(lemma, optionsFilled), {
			headers: optionsFilled.userAgent !== undefined ? { "User-Agent": optionsFilled.userAgent } : {},
		});
	} catch {
		return undefined;
	}

	const body = await response.text();
	const $ = cheerio.load(body);

	if (!response.ok) {
		if (response.status === 404 && options.followRedirect) {
			const suggestedLemma = $(selectors.didYouMean).html() ?? undefined;
			if (suggestedLemma === undefined) {
				return undefined;
			}

			return get(suggestedLemma, optionsFilled);
		} else {
			return undefined;
		}
	}

	return parse(optionsFilled, $, { value: lemma });
}

export * from "./parsers/parser.js";
export * from "./options.js";
export * from "./types.js";
