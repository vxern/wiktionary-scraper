import * as cheerio from "cheerio";
import constants from "./constants/constants.js";
import { parse } from "./languages/parsers.js";
import { resolveSkeletons } from "./languages/resolvers.js";
import { type ScraperOptions, defaultScraperOptions } from "./options.js";
import type { QueryResult } from "./types.js";

export async function get(lemma: string, optionsPartial?: Partial<ScraperOptions>): Promise<QueryResult | undefined> {
	const options: ScraperOptions = { ...defaultScraperOptions, ...optionsPartial };

	const result = await fetchPageContents(lemma, options);
	if (result === undefined) {
		return undefined;
	}

	const { contents, isRedirect } = result;

	if (isRedirect) {
		const $ = cheerio.load(contents);
		const suggestedLemma = $(constants.selectors.didYouMean).html() ?? undefined;
		if (suggestedLemma === undefined) {
			return undefined;
		}

		const result = await get(suggestedLemma, options);
		if (result === undefined) {
			return undefined;
		}

		return { entries: result.entries, redirected: true };
	}

	const $ = cheerio.load(contents);

	const skeletons = resolveSkeletons($, options);
	if (skeletons === undefined) {
		return undefined;
	}

	const skeleton = skeletons.find((skeleton) => skeleton.name === options.lemmaLanguage);
	if (skeleton === undefined) {
		return undefined;
	}

	const entries = parse($, skeleton, { value: lemma }, options);
	if (entries === undefined) {
		return undefined;
	}

	return { entries, redirected: false };
}

export type FetchResult = { contents: string; isRedirect: boolean };
export async function fetchPageContents(
	lemma: string,
	options: ScraperOptions = defaultScraperOptions,
): Promise<FetchResult | undefined> {
	let response;
	try {
		response = await fetch(constants.links.definition(lemma, options), {
			headers: options.userAgent !== undefined ? { "User-Agent": options.userAgent } : {},
		});
	} catch {
		return undefined;
	}

	const contents = await response.text().catch(() => undefined);
	if (contents === undefined) {
		return undefined;
	}

	if (!response.ok) {
		if (response.status === 404 && options.followRedirect) {
			return { contents, isRedirect: true };
		}

		return undefined;
	}

	return { contents, isRedirect: false };
}

export * from "./languages/parsers.js";
export * from "./languages/resolvers.js";
export * from "./options.js";
export * from "./types.js";
