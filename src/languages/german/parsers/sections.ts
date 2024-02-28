import * as cheerio from "cheerio";
import constants from "../../../constants/constants.js";
import {
	Composition,
	Definition,
	EntrySectionSkeleton,
	Etymology,
	Example,
	Inflection,
	LabelledTextField,
	Pronunciation,
	Quotation,
	Reference,
	Relation,
	Translation,
	UsageNotes,
} from "../../../types.js";
import { getCleaned } from "../../../utils.js";
import { SectionParsers } from "../../parsers.js";

export default {
	etymology: parseEtymology,
	pronunciation: parsePronunciation,
	usageNotes: parseUsageNotes,
	inflection: parseInflection,
	synonyms: parseRelations,
	antonyms: parseRelations,
	hypernyms: parseRelations,
	hyponyms: parseRelations,
	meronyms: parseRelations,
	holonyms: parseRelations,
	coordinate: parseRelations,
	related: parseRelations,
	collocations: parseRelations,
	composition: parseComposition,
	translations: parseTranslations,
	references: parseReferences,
	definitions: parseDefinitions,
	examples: parseExamples,
} satisfies SectionParsers as SectionParsers;

// TODO(vxern): Implement.
function parseEtymology(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Etymology | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseComposition(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Composition[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseDefinitions($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton): Definition[] | undefined {
	const $root = $(skeleton.id);
	const $row = $root.parent();

	const $heading = $row.next(constants.selectors.definitions.heading.heading);
	// const $headword = $heading.find(selectors.definitions.heading.headword);
	// const lemma = clean($headword.text());

	const $list = $heading.next(constants.selectors.definitions.definitions.definitions.list);
	const $definitions = $list.children(constants.selectors.definitions.definitions.definitions.definitions);
	const definitions: Definition[] = [];
	for (const definitionElement of $definitions) {
		const definition = parseDefinition($, definitionElement);
		if (definition === undefined) {
			continue;
		}

		definitions.push(definition);
	}

	return definitions;
}

function parseDefinition($: cheerio.CheerioAPI, element: cheerio.Element): Definition | undefined {
	const $root = $(element);

	let examples: Example[] | undefined;
	let quotations: Quotation[] | undefined;
	let definitions: Definition[] | undefined;

	const $exampleSection = $root.find(constants.selectors.definitions.definitions.examples.list).first();
	if ($exampleSection.length !== 0) {
		const examples_: Example[] = [];

		const $examples = $exampleSection.children(constants.selectors.definitions.definitions.examples.examples);
		$examples.remove();
		for (const _ of $examples) {
			// TODO(vxern): Parse examples.
		}

		if (examples_.length !== 0) {
			examples = examples_;
		}
	}

	const $quotationSection = $root.find(constants.selectors.definitions.definitions.quotations.list).first();
	if ($quotationSection.length !== 0) {
		const quotations_: Quotation[] = [];

		const $quotations = $quotationSection.children(constants.selectors.definitions.definitions.quotations.quotations);
		$quotations.remove();
		for (const _ of $quotations) {
			// TODO(vxern): Parse quotations.
		}

		if (quotations_.length !== 0) {
			quotations = quotations_;
		}
	}

	const $definitionSection = $root.find(constants.selectors.definitions.definitions.definitions.list).first();
	if ($definitionSection.length !== 0) {
		const definitions_: Definition[] = [];

		const $definitions = $definitionSection.children(
			constants.selectors.definitions.definitions.definitions.definitions,
		);
		$definitions.remove();
		for (const definitionElement of $definitions) {
			const definition = parseDefinition($, definitionElement);
			if (definition === undefined) {
				continue;
			}

			definitions_.push(definition);
		}

		if (definitions_.length !== 0) {
			definitions = definitions_;
		}
	}

	const contentsRaw = getCleaned($root.contents().text());
	const semicolonSeparated = contentsRaw.split(constants.patterns.fieldSeparator);

	const fieldsRaw: [labels: string[] | undefined, contents: string][] = [];
	for (const sentence of semicolonSeparated) {
		const [_, labelsRaw, contents] = constants.patterns.withPrefixedLabels.exec(sentence) ?? [];
		if (contents === undefined) {
			return undefined;
		}

		if (labelsRaw === undefined) {
			const previousField = fieldsRaw.at(-1);
			if (previousField === undefined) {
				fieldsRaw.push([undefined, contents]);
			} else {
				previousField[1] = `${previousField[1]}; ${contents}`;
			}
			continue;
		}

		const labels = labelsRaw.split(constants.patterns.labelSeparator);
		fieldsRaw.push([labels, contents]);
	}

	const fields: LabelledTextField[] = [];
	for (const [labels, value] of fieldsRaw) {
		if (labels !== undefined) {
			fields.push({ labels, value });
		} else {
			fields.push({ value });
		}
	}

	const definition: Definition = { fields };

	if (examples !== undefined) {
		definition.examples = examples;
	}

	if (quotations !== undefined) {
		definition.quotations = quotations;
	}

	if (definitions !== undefined) {
		definition.definitions = definitions;
	}

	return definition;
}

// TODO(vxern): Implement.
function parseExamples(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Example[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseInflection(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Inflection | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseRelations(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Relation[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parsePronunciation(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Pronunciation | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseReferences(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Reference[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseTranslations(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Translation[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseUsageNotes(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): UsageNotes | undefined {
	return undefined;
}
