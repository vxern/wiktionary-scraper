import { Sections } from "../types.js";
import { Parser } from "./parser.js";
import description from "./shared/description.js";
import glyphOrigin from "./shared/glyph-origin.js";
import etymology from "./shared/etymology.js";
import pronunciation from "./shared/pronunciation.js";
import production from "./shared/production.js";
import usageNotes from "./shared/usage-notes.js";
import reconstructionNotes from "./shared/reconstruction-notes.js";
import inflection from "./shared/inflection.js";
import conjugation from "./shared/conjugation.js";
import declension from "./shared/declension.js";
import mutation from "./shared/mutation.js";
import quotations from "./shared/quotations.js";
import alternativeForms from "./shared/alternative-forms.js";
import alternativeReconstructions from "./shared/alternative-reconstructions.js";
import relations from "./shared/relations.js";
import translations from "./shared/translations.js";
import trivia from "./shared/trivia.js";
import seeAlso from "./shared/see-also.js";
import references from "./shared/references.js";
import furtherReading from "./shared/further-reading.js";
import anagrams from "./shared/anagrams.js";
import definitions from "./shared/definitions.js";
import examples from "./shared/examples.js";

type Parsers = {
	[K in keyof Sections]: Parser<Partial<Sections>, K>;
};

export default {
	description,
	glyphOrigin,
	etymology,
	pronunciation,
	production,
	usageNotes,
	reconstructionNotes,
	inflection,
	conjugation,
	declension,
	mutation,
	quotations,
	alternativeForms,
	alternativeReconstructions,
	synonyms: relations,
	antonyms: relations,
	hypernyms: relations,
	hyponyms: relations,
	meronyms: relations,
	holonyms: relations,
	comeronyms: relations,
	troponyms: relations,
	parasynonyms: relations,
	coordinate: relations,
	derived: relations,
	related: relations,
	collocations: relations,
	descendants: relations,
	translations,
	trivia,
	seeAlso,
	references,
	furtherReading,
	anagrams,
	definitions,
	examples,
} satisfies Parsers as Parsers;
