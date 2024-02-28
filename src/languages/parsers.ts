import * as cheerio from "cheerio";
import { ScraperOptions, SiteLanguage } from "../options.js";
import { Entry, EntrySectionSkeleton, Lemma, SectionType, Sections } from "../types.js";
import { default as englishSections } from "./english/parsers/sections.js";
import { default as englishSkeleton } from "./english/parsers/skeleton.js";
import { default as germanSections } from "./german/parsers/sections.js";
import { default as germanSkeleton } from "./german/parsers/skeleton.js";

const parsers = {
	skeleton: {
		de: germanSkeleton,
		en: englishSkeleton,
	} satisfies Record<SiteLanguage, Parser>,
	sections: {
		de: germanSections,
		en: englishSections,
	} satisfies Record<SiteLanguage, SectionParsers>,
};

export type Parser = ($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton, lemma: Lemma) => Entry[] | undefined;

type SectionParser<ReturnType> = ($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton) => ReturnType | undefined;

export type SectionParsers = Partial<{
	[K in keyof Sections]: SectionParser<Sections[K]>;
}>;

export function parse(
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
	options: ScraperOptions,
): Entry[] | undefined {
	const parse = parsers.skeleton[options.siteLanguage];

	return parse($, skeleton, lemma);
}

export function parseSection<K extends SectionType>(
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	sectionType: SectionType,
	options: ScraperOptions,
): Sections[K] | undefined {
	const parse = parsers.sections[options.siteLanguage][sectionType];
	if (parse === undefined) {
		return undefined;
	}

	return parse($, skeleton) as Sections[K];
}
