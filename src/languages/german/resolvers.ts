import * as cheerio from "cheerio";
import constants from "../../constants/constants.js";
import { EntrySectionSkeleton, SectionNameTuple, SectionTypeTuple } from "../../types.js";
import { Resolvers, SectionsResolved } from "../resolvers.js";
import partsOfSpeech from "./parts-of-speech.js";
import sections from "./sections.js";
import selectors from "../../constants/types/selectors.js";

const resolvers: Resolvers = { resolveEntrySkeletons, resolveSections };

function resolveEntrySkeletons($: cheerio.CheerioAPI): EntrySectionSkeleton[] | undefined {
	const sections: EntrySectionSkeleton[] = [];

	const $contents = $(selectors.contents);

	const $languages = $contents.children(selectors.headings.language);
	for (const language of $languages) {
		const section: EntrySectionSkeleton = { id: };
	}

	return [{ id: "", name: "", sections: [] }];
}

/*
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
	const nameUnprocessed = $name.contents().not($name.children()).text().trim() ?? undefined;
	if (nameUnprocessed === undefined) {
		return undefined;
	}

	let name: string;
	if (depth === 1) {
		const [_, __, labelsRaw] = constants.patterns.withSuffixedLabels.exec(nameUnprocessed) ?? [];
		if (labelsRaw === undefined) {
			return undefined;
		}

		const languages = labelsRaw.split(", ");
		const language = languages.at(0);
		if (language === undefined) {
			return undefined;
		}

		name = language;
	} else {
		name = nameUnprocessed;
	}

	if (depth === 2) {
		return resolveEntrySkeletonFromContents($, id, name);
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
*/

function resolveSections(skeleton: EntrySectionSkeleton): SectionsResolved {
	const known: SectionTypeTuple[] = [];
	const unknown: SectionNameTuple[] = [];
	for (const sectionSkeleton of skeleton.sections) {
		if (constants.patterns.sectionNameMultiple.test(sectionSkeleton.name)) {
			const [_, sectionNamesRaw] = constants.patterns.sectionNameMultiple.exec(sectionSkeleton.name) ?? [];
			if (sectionNamesRaw === undefined) {
				continue;
			}

			const partsOfSpeechRaw = sectionNamesRaw.split(", ");

			const partsOfSpeechRecognised: string[] = [];
			for (const partOfSpeech of partsOfSpeechRaw) {
				if (!(partOfSpeech in partsOfSpeech)) {
					continue;
				}

				partsOfSpeechRecognised.push(partOfSpeech);
			}

			for (const partOfSpeech of partsOfSpeechRecognised) {
				const skeleton: EntrySectionSkeleton = { ...sectionSkeleton, name: partOfSpeech };
				unknown.push([partOfSpeech, skeleton]);
			}

			continue;
		}

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
