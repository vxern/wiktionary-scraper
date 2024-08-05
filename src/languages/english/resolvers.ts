import type * as cheerio from "cheerio";
import constants from "../../constants/constants.js";
import type { EntrySectionSkeleton, SectionNameTuple, SectionTypeTuple } from "../../types.js";
import type { Resolvers, SectionsResolved } from "../resolvers.js";
import sections from "./sections.js";

const resolvers: Resolvers = { resolveEntrySkeletons, resolveSections };

function resolveEntrySkeletons($: cheerio.CheerioAPI): EntrySectionSkeleton[] | undefined {
	const $tableOfContents = $(constants.selectors.tableOfContents.tableOfContents).first();
	const $entries = $tableOfContents.find(constants.selectors.tableOfContents.entries.entries(0));

	const skeletons: EntrySectionSkeleton[] = [];
	for (const entryElement of $entries) {
		const skeleton = resolveEntrySkeleton($, entryElement, 1);
		if (skeleton === undefined) {
			continue;
		}

		skeletons.push(skeleton);
	}

	return skeletons;
}

function resolveEntrySkeleton(
	$: cheerio.CheerioAPI,
	section: cheerio.Element,
	depth: number,
): EntrySectionSkeleton | undefined {
	const $section = $(section);
	const $root = $section.find(constants.selectors.tableOfContents.entries.root.root).first();
	const id = $root.attr("href");
	if (id === undefined) {
		return undefined;
	}

	const $name = $root.find(constants.selectors.tableOfContents.entries.root.text).first();
	const name = $name.html() ?? undefined;
	if (name === undefined) {
		return undefined;
	}

	const $sections = $section.find(constants.selectors.tableOfContents.entries.entries(depth));
	if ($sections === undefined) {
		return { id, name, sections: [] };
	}

	const sections: EntrySectionSkeleton[] = [];
	for (const sectionElement of $sections) {
		const section = resolveEntrySkeleton($, sectionElement, depth + 1);
		if (section === undefined) {
			continue;
		}

		sections.push(section);
	}

	return { id, name, sections };
}

function resolveSections(skeleton: EntrySectionSkeleton): SectionsResolved {
	const known: SectionTypeTuple[] = [];
	const unknown: SectionNameTuple[] = [];

	for (const sectionSkeleton of skeleton.sections) {
		const [_, sectionName] = constants.patterns.sectionName.exec(sectionSkeleton.name) ?? [];
		if (sectionName === undefined) {
			continue;
		}

		const sectionType = sections[sectionName];
		if (sectionType === undefined) {
			unknown.push([sectionName, sectionSkeleton]);
			continue;
		}

		known.push([sectionType, sectionSkeleton]);
	}

	return { known, unknown };
}

export default resolvers;
