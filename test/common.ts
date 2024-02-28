import * as cheerio from "cheerio";
import { EntrySectionSkeleton } from "../src";
import * as Wiktionary from "../src/index.js";

export async function fetchSkeleton(
	lemma: string,
	options: Wiktionary.ScraperOptions,
): Promise<[$: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton]> {
	const result = await Wiktionary.fetchPageContents(lemma, options);
	if (result === undefined) {
		throw "Failed to fetch contents for page.";
	}

	const $ = cheerio.load(result.contents);

	const skeletons = Wiktionary.resolveSkeletons($, options);
	if (skeletons === undefined) {
		throw "Failed to resolve entry skeletons.";
	}

	const skeleton = skeletons.find((skeleton) => skeleton.name === options.lemmaLanguage);
	if (skeleton === undefined) {
		throw `Failed to resolve entry skeleton for ${options.lemmaLanguage}.`;
	}

	return [$, skeleton];
}
