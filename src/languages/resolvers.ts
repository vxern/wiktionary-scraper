import * as cheerio from "cheerio";
import { ScraperOptions, SiteLanguage, defaultScraperOptions } from "../options.js";
import { EntrySectionSkeleton, SectionNameTuple, SectionTypeTuple } from "../types.js";
import english from "./english/resolvers.js";
import german from "./german/resolvers.js";

const resolvers: Record<SiteLanguage, Resolvers> = {
	de: german,
	en: english,
};

export interface Resolvers {
	resolveEntrySkeletons: ($: cheerio.CheerioAPI) => EntrySectionSkeleton[] | undefined;
	resolveSections: (skeleton: EntrySectionSkeleton) => SectionsResolved;
}

export interface SectionsResolved {
	known: SectionTypeTuple[];
	unknown: SectionNameTuple[];
}

export function resolveSkeletons(
	$: cheerio.CheerioAPI,
	options: ScraperOptions = defaultScraperOptions,
): EntrySectionSkeleton[] | undefined {
	return resolvers[options.siteLanguage].resolveEntrySkeletons($);
}

export function resolveSections(
	skeleton: EntrySectionSkeleton,
	options: ScraperOptions = defaultScraperOptions,
): SectionsResolved {
	return resolvers[options.siteLanguage].resolveSections(skeleton);
}
