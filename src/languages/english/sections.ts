import { SectionType } from "../../types.js";
import { getReversed } from "../../utils.js";

/**
 * @see https://en.wiktionary.org/wiki/Wiktionary:Entry_layout#List_of_headings
 */
export default getReversed({
	description: "Description",
	glyphOrigin: "Glyph origin",
	etymology: "Etymology",
	pronunciation: "Pronunciation",
	production: "Production",
	usageNotes: "Usage notes",
	reconstructionNotes: "Reconstruction notes",
	inflection: "Inflection",
	conjugation: "Conjugation",
	declension: "Declension",
	mutation: "Mutation",
	quotations: "Quotations",
	alternativeForms: "Alternative forms",
	alternativeReconstructions: "Alternative reconstructions",
	synonyms: "Synonyms",
	antonyms: "Antonyms",
	hypernyms: "Hypernyms",
	hyponyms: "Hyponyms",
	meronyms: "Meronyms",
	holonyms: "Holonyms",
	comeronyms: "Comeronyms",
	troponyms: "Troponyms",
	parasynonyms: "Parasynonyms",
	coordinate: "Coordinate terms",
	derived: "Derived terms",
	related: "Related terms",
	collocations: "Collocations",
	descendants: "Descendants",
	translations: "Translations",
	trivia: "Trivia",
	seeAlso: "See also",
	references: "References",
	furtherReading: "Further reading",
	anagrams: "Anagrams",
	definitions: "Definitions",
	examples: "Examples",
} satisfies Partial<Record<SectionType, string>> as Partial<Record<SectionType, string>>);
