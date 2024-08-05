export const defaultScraperOptions: ScraperOptions = {
	lemmaLanguage: "English",
	siteLanguage: "en",
	userAgent: "wiktionary-scraper (https://github.com/vxern/wiktionary-scraper)",
	followRedirect: false,
} as const;

export type SiteLanguage = "en";

/** Defines the available options for getting a lemma from the dictionary. */
export interface ScraperOptions {
	/**
	 * Specifies the language of the lemma.
	 *
	 * @defaultValue `"English"`
	 */
	lemmaLanguage: string;

	/**
	 * Specifies the language of the website.
	 *
	 * @defaultValue `"en"`
	 */
	siteLanguage: SiteLanguage;

	/**
	 * Specifies the User-Agent header to use for self-identification.
	 *
	 * Set to {@link undefined} to omit the header.
	 *
	 * @defaultValue `"wiktionary-scraper (github.com/vxern/wiktionary-scraper)"`
	 */
	userAgent: string | undefined;

	/**
	 * Whether the scraper should follow redirects to similar terms if the term does not exist.
	 */
	followRedirect: boolean;
}

export function withDefaults(options: Partial<ScraperOptions>): ScraperOptions {
	return { ...defaultScraperOptions, ...options };
}
