import * as cheerio from "cheerio";
import constants from "../../../constants/constants.js";
import {
	AlternativeForm,
	AlternativeReconstruction,
	Anagram,
	Definition,
	Description,
	EntrySectionSkeleton,
	Etymology,
	Example,
	FurtherReading,
	GlyphOrigin,
	Inflection,
	LabelledTextField,
	Mutation,
	Production,
	Pronunciation,
	Quotation,
	ReconstructionNotes,
	Reference,
	Relation,
	SeeAlso,
	Translation,
	Trivia,
	UsageNotes,
} from "../../../types.js";
import { getCleaned } from "../../../utils.js";
import { SectionParsers } from "../../parsers.js";

export default {
	description: parseDescription,
	glyphOrigin: parseGlyphOrigin,
	etymology: parseEtymology,
	pronunciation: parsePronunciation,
	production: parseProduction,
	usageNotes: parseUsageNotes,
	reconstructionNotes: parseReconstructionNotes,
	inflection: parseInflection,
	conjugation: parseConjugation,
	declension: parseDeclension,
	mutation: parseMutation,
	quotations: parseQuotations,
	alternativeForms: parseAlternativeForms,
	alternativeReconstructions: parseAlternativeReconstructions,
	synonyms: parseRelations,
	antonyms: parseRelations,
	hypernyms: parseRelations,
	hyponyms: parseRelations,
	meronyms: parseRelations,
	holonyms: parseRelations,
	comeronyms: parseRelations,
	troponyms: parseRelations,
	parasynonyms: parseRelations,
	coordinate: parseRelations,
	derived: parseRelations,
	related: parseRelations,
	collocations: parseRelations,
	descendants: parseRelations,
	translations: parseTranslations,
	trivia: parseTrivia,
	seeAlso: parseSeeAlso,
	references: parseReferences,
	furtherReading: parseFurtherReading,
	anagrams: parseAnagrams,
	definitions: parseDefinitions,
	examples: parseExamples,
} satisfies SectionParsers as SectionParsers;

// TODO(vxern): Implement.
function parseAlternativeForms(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): AlternativeForm[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseAlternativeReconstructions(
	_: cheerio.CheerioAPI,
	__: EntrySectionSkeleton,
): AlternativeReconstruction[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseAnagrams(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Anagram[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseConjugation(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Inflection | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseDeclension(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Inflection | undefined {
	return undefined;
}

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
function parseDescription(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Description | undefined {
	return undefined;
}

function parseEtymology($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton): Etymology | undefined {
	const $root = $(skeleton.id);
	const $row = $root.parent();

	const $elements = $row.nextUntil(constants.selectors.section);

	const $paragraphs = $elements.filter((_, element) => element.name === constants.selectors.etymology.paragraph);
	const paragraphs = $paragraphs.toArray().map((paragraph) => getCleaned($(paragraph).text()));

	const $lists = $elements.filter(
		(_, element) =>
			element.name === constants.selectors.etymology.lists.unordered ||
			element.name === constants.selectors.etymology.lists.ordered,
	);
	const listEntries = $lists
		.children(constants.selectors.etymology.lists.elements)
		.toArray()
		.map((field) => getCleaned($(field).text()));

	if (paragraphs.length === 0 && listEntries.length === 0) {
		return undefined;
	}

	if (paragraphs.length === 0) {
		return { listEntries };
	} else if (listEntries.length === 0) {
		return { paragraphs };
	} else {
    return { paragraphs, listEntries };
  }
}

// TODO(vxern): Implement.
function parseExamples(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Example[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseFurtherReading(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): FurtherReading | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseGlyphOrigin(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): GlyphOrigin | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseInflection(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Inflection | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseMutation(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Mutation | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseProduction(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Production | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parsePronunciation(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Pronunciation | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseQuotations(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Quotation[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseReconstructionNotes(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): ReconstructionNotes | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseReferences(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Reference[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseRelations(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Relation[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseSeeAlso(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): SeeAlso | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseTranslations(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Translation[] | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseTrivia(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Trivia | undefined {
	return undefined;
}

// TODO(vxern): Implement.
function parseUsageNotes(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): UsageNotes | undefined {
	return undefined;
}
