import * as cheerio from "cheerio";
import { Entry, Lemma, PartOfSpeech, SectionType, Sections } from "../types.js";
import selectors from "../constants/selectors.js";
import { ScraperOptions } from "../options.js";
import patterns from "../constants/patterns.js";
import sections from "../constants/sections.js";
import parsers from "./parsers.js";
import partsOfSpeech from "../constants/parts-of-speech.js";
import { addMissingProperties } from "../utils.js";

export type Parser<S extends Partial<Sections>, K extends keyof S> = (
	$: cheerio.CheerioAPI,
	sectionSkeleton: EntrySectionSkeleton,
) => S[K];

export interface EntrySectionSkeleton {
	id: string;
	name: string;
	sections: EntrySectionSkeleton[];
}

export function parse(options: ScraperOptions, $: cheerio.CheerioAPI, lemma: Lemma): Entry[] | undefined {
	const $tableOfContents = $(selectors.tableOfContents.tableOfContents).first();
	const $entries = $tableOfContents.find(selectors.tableOfContents.entries.entries(0));

	const skeletons: EntrySectionSkeleton[] = [];
	for (const entryElement of $entries) {
		const skeleton = parseSectionSkeleton($, entryElement, 1);
		if (skeleton === undefined) {
			continue;
		}

		skeletons.push(skeleton);
	}

	const skeletonForLanguage = skeletons.find((skeleton) => skeleton.name === options.lemmaLanguage);
	if (skeletonForLanguage === undefined) {
		return undefined;
	}

	return parseEntrySkeleton(options, $, skeletonForLanguage, lemma);
}

function parseSectionSkeleton(
	$: cheerio.CheerioAPI,
	section: cheerio.Element,
	depth: number,
): EntrySectionSkeleton | undefined {
	const $section = $(section);
	const $root = $section.find(selectors.tableOfContents.entries.root.root).first();
	const id = $root.attr("href");
	if (id === undefined) {
		return undefined;
	}

	const $name = $root.find(selectors.tableOfContents.entries.root.text).first();
	const name = $name.html() ?? undefined;
	if (name === undefined) {
		return undefined;
	}

	const $sections = $section.find(selectors.tableOfContents.entries.entries(depth));
	if ($sections === undefined) {
		return { id, name, sections: [] };
	}

	const sections: EntrySectionSkeleton[] = [];
	for (const sectionElement of $sections) {
		const section = parseSectionSkeleton($, sectionElement, depth + 1);
		if (section === undefined) {
			continue;
		}

		sections.push(section);
	}

	return { id, name, sections };
}

function parseEntrySkeleton(
	options: ScraperOptions,
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
): Entry[] | undefined {
	const isMultipleEntries = skeleton.sections.some((skeleton) => {
		const [_, sectionName, sectionIndex] = patterns.sectionName.exec(skeleton.name) ?? [];
		if (sectionName === undefined) {
			return false;
		}

		const sectionType = sections[options.siteLanguage][sectionName];
		if (sectionType === undefined) {
			return false;
		}

		return sectionType === "etymology" && sectionIndex !== undefined;
	});
	if (isMultipleEntries) {
		return parseMultipleEntries(options, $, skeleton, lemma);
	}

	const entry = parseSingleEntry(options, $, skeleton, lemma);
	if (entry === undefined) {
		return [];
	}

	return [entry];
}

type SectionTypeTuple = [sectionType: SectionType, sectionIndex: number | undefined, skeleton: EntrySectionSkeleton];
type SectionNameTuple = [sectionName: string, skeleton: EntrySectionSkeleton];

function parseMultipleEntries(
	options: ScraperOptions,
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
): Entry[] | undefined {
	const sectionsMapped = sections[options.siteLanguage];

	const skeletonWithoutEtymologySections: EntrySectionSkeleton = { id: skeleton.id, name: skeleton.name, sections: [] };

	const etymologySections: EntrySectionSkeleton[] = [];
	for (const sectionSkeleton of skeleton.sections) {
		const [_, sectionName] = patterns.sectionName.exec(sectionSkeleton.name) ?? [];
		if (sectionName === undefined) {
			continue;
		}

		const sectionType = sectionsMapped[sectionName];
		if (sectionType === undefined) {
			continue;
		}

		if (sectionType === "etymology") {
			etymologySections.push(sectionSkeleton);
		} else {
			skeletonWithoutEtymologySections.sections.push(sectionSkeleton);
		}
	}

	const topLevelEntry = parseSingleEntry(options, $, skeletonWithoutEtymologySections, lemma);

	const entries: Entry[] = [];
	for (const etymologySection of etymologySections) {
		const etymology = parsers.etymology($, etymologySection);

		const entry = parseSingleEntry(options, $, etymologySection, lemma);
		if (entry === undefined) {
			continue;
		}

		if (etymology !== undefined) {
			entry.etymology = etymology;
		}

		entries.push(entry);
	}

	if (topLevelEntry !== undefined) {
		if (entries.length === 0) {
			return [topLevelEntry];
		}

		for (const entry of entries) {
			addMissingProperties(entry, topLevelEntry);
		}

		return entries;
	} else {
		return entries;
	}
}

function parseSingleEntry(
	options: ScraperOptions,
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
): Entry | undefined {
	const sectionsMapped = sections[options.siteLanguage];
	const partsOfSpeechMapped = partsOfSpeech[options.siteLanguage];

	const sectionTuples: SectionTypeTuple[] = [];
	const sectionsUnrecognised: SectionNameTuple[] = [];
	for (const sectionSkeleton of skeleton.sections) {
		const [_, sectionName] = patterns.sectionName.exec(sectionSkeleton.name) ?? [];
		if (sectionName === undefined) {
			continue;
		}

		const sectionType = sectionsMapped[sectionName];
		if (sectionType === undefined) {
			sectionsUnrecognised.push([sectionName, sectionSkeleton]);
			continue;
		}

		sectionTuples.push([sectionType, undefined, sectionSkeleton]);
	}

	const entrySections: Partial<Sections> = {};
	for (const [sectionType, _, sectionSkeleton] of sectionTuples) {
		if (sectionType in entrySections) {
			continue;
		}

		const parse = parsers[sectionType];
		const section = parse($, sectionSkeleton);
		if (section === undefined) {
			continue;
		}

		// @ts-ignore: This is fine.
		entrySections[sectionType] = section;
	}

	let partOfSpeech: PartOfSpeech | undefined;
	for (const [sectionName, skeleton] of sectionsUnrecognised) {
		const partOfSpeechMatched = partsOfSpeechMapped[sectionName];
		if (partOfSpeechMatched === undefined) {
			continue;
		}

		const definitions = parsers.definitions($, skeleton);
		if (definitions === undefined) {
			continue;
		}

		partOfSpeech = partOfSpeechMatched;
		entrySections.definitions = definitions;
	}

	const entry: Entry = { lemma, ...entrySections };

	if (partOfSpeech !== undefined) {
		entry.partOfSpeech = partOfSpeech;
	}

	return entry;
}
