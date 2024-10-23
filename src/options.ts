import type { Links } from "./constants/links";

export type SiteLanguage = "en";

/** Defines the available options for getting a lemma from the dictionary. */
export interface ScraperOptions {
	/**
	 * Specifies the language of the lemma.
	 *
	 * @defaultValue "English"
	 */
	lemmaLanguage: string;

	/**
	 * Specifies the language of the website.
	 *
	 * @defaultValue "en"
	 */
	siteLanguage: SiteLanguage;

	/**
	 * Specifies the User-Agent header to use for self-identification.
	 *
	 * Set to {@link undefined} to omit the header.
	 *
	 * @defaultValue "wiktionary-scraper (github.com/vxern/wiktionary-scraper)"
	 */
	userAgent: string | undefined;

	/**
	 * Whether the scraper should follow redirects to similar terms if the term does not exist.
	 *
	 * @defaultValue false
	 */
	followRedirect: boolean;

	/**
	 * Specifies the links to query.
	 *
	 * @defaultValue links
	 */
	links: Links;
}
