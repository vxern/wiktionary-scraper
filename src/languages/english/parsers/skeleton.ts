import * as cheerio from "cheerio";
import constants from "../../../constants/constants.js";
import { ScraperOptions, defaultScraperOptions } from "../../../options.js";
import { Entry, EntrySectionSkeleton, Lemma, Sections } from "../../../types.js";
import { getFilled } from "../../../utils.js";
import { parseSection } from "../../parsers.js";
import partsOfSpeech from "../parts-of-speech.js";
import resolvers from "../resolvers.js";
import sections from "../sections.js";

function isMultipleEntries(skeleton: EntrySectionSkeleton): boolean {
	for (const section of skeleton.sections) {
		const [_, sectionName, sectionIndex] = constants.patterns.sectionName.exec(section.name) ?? [];
		if (sectionName === undefined) {
			continue;
		}

		const sectionType = sections[sectionName];
		if (sectionType === undefined) {
			continue;
		}

		if (sectionType === "etymology" && sectionIndex !== undefined) {
			return true;
		}
	}

	return false;
}

export default function parse(
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
	options: ScraperOptions = defaultScraperOptions,
): Entry[] | undefined {
	if (isMultipleEntries(skeleton)) {
		return parseMultipleEtymologies($, skeleton, lemma, options);
	}

	const entries = parseSingleEtymology($, skeleton, lemma, options);
	if (entries === undefined) {
		return [];
	}

	return entries;
}

function parseMultipleEtymologies(
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
	options: ScraperOptions,
): Entry[] | undefined {
	const sectionsResolved = resolvers.resolveSections(skeleton);

	const etymologySections: EntrySectionSkeleton[] = [];
	for (const [sectionType, skeleton] of sectionsResolved.known) {
		if (sectionType === "etymology") {
			etymologySections.push(skeleton);
		}
	}

	const skeletonWithoutEtymologySections: EntrySectionSkeleton = { id: skeleton.id, name: skeleton.name, sections: [] };
	for (const [_, skeleton] of sectionsResolved.unknown) {
		skeletonWithoutEtymologySections.sections.push(skeleton);
	}

	const topLevelEntries = parseSingleEtymology($, skeletonWithoutEtymologySections, lemma, options);

	const entries: Entry[] = [];
	for (const skeleton of etymologySections) {
		const etymology = parseSection<"etymology">($, skeleton, "etymology", options);

		const entriesNew = parseSingleEtymology($, skeleton, lemma, options);
		if (entriesNew === undefined) {
			continue;
		}

		if (etymology !== undefined) {
			for (const entry of entriesNew) {
				entry.etymology = etymology;
			}
		}

		entries.push(...entriesNew);
	}

	if (topLevelEntries !== undefined) {
		if (entries.length === 0) {
			return topLevelEntries;
		}

		for (const entry of entries) {
			for (const topLevelEntry of topLevelEntries) {
				getFilled(entry, topLevelEntry);
			}
		}

		return entries;
	} else {
		return entries;
	}
}

function parseSingleEtymology(
	$: cheerio.CheerioAPI,
	skeleton: EntrySectionSkeleton,
	lemma: Lemma,
	options: ScraperOptions,
): Entry[] | undefined {
	const sectionsResolved = resolvers.resolveSections(skeleton);

	const entrySections: Partial<Sections> = {};
	for (const [sectionType, skeleton] of sectionsResolved.known) {
		if (sectionType in entrySections) {
			continue;
		}

		const section = parseSection($, skeleton, sectionType, options);
		if (section === undefined) {
			continue;
		}

		// @ts-ignore: This is fine.
		entrySections[sectionType] = section;
	}

	const entries: Entry[] = [];
	for (const [sectionName, skeleton] of sectionsResolved.unknown) {
		const partOfSpeech = partsOfSpeech[sectionName];
		if (partOfSpeech === undefined) {
			continue;
		}

		const section = parseSection<"definitions">($, skeleton, "definitions", options);
		if (section === undefined) {
			continue;
		}

		entries.push({ ...entrySections, lemma, partOfSpeech, definitions: section });
	}
	return entries;
}
