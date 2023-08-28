export interface LabelledTextField {
	labels?: string[];
	value: string;
}

export type UsageNotes = string;
export type ReconstructionNotes = string;
export type Inflection = string[][];
export type Mutation = string;
export type Quotation = string;
export type AlternativeForm = LabelledTextField;
export type AlternativeReconstruction = string;
export type Relation = LabelledTextField;
export type Translation = {
	language: string;
	words: string[];
};
export type Trivia = string;
export type SeeAlso = string;
export type Reference = string;
export type FurtherReading = string;
export type Anagram = string;
export type Lemma = LabelledTextField;
export interface Definition extends Partial<SharedSections> {
	fields: LabelledTextField[];
	definitions?: Definition[];
}
export type Example = string;

export interface Inflections {
	inflection: Inflection;
	conjugation: Inflection;
	declension: Inflection;
}

export interface Relations {
	synonyms: Relation[];
	antonyms: Relation[];
	hypernyms: Relation[];
	hyponyms: Relation[];
	meronyms: Relation[];
	holonyms: Relation[];
	/**
	 * @remarks
	 * Not present in headings after definitions, but present in relations.
	 */
	comeronyms: Relation[];
	troponyms: Relation[];
	/**
	 * @remarks
	 * Not present in headings after definitions, but present in relations.
	 */
	parasynonyms: Relation[];
	coordinate: Relation[];
	derived: Relation[];
	related: Relation[];
	collocations: Relation[];
	descendants: Relation[];
}

/**
 * @see https://en.wiktionary.org/wiki/Wiktionary:Entry_layout#List_of_headings
 */
type SharedSections = {
	usageNotes: UsageNotes;
	reconstructionNotes: ReconstructionNotes;
} & Inflections & {
		mutation: Mutation;
		quotations: Quotation[];
		alternativeForms: AlternativeForm[];
		alternativeReconstructions: AlternativeReconstruction[];
	} & Relations & {
		translations: Translation[];
		trivia: Trivia;
		seeAlso: SeeAlso;
		references: Reference[];
		furtherReading: FurtherReading;
		anagrams: Anagram[];
		/**
		 * @remarks
		 * Not present in headings after definitions.
		 */
		examples: Example[];
	};

export type Description = string;
export type GlyphOrigin = string;
export type Etymology = {
	paragraphs: string[];
	listEntries: string[];
};
export interface Transcription extends LabelledTextField {
	system: string;
	key: string;
}
export type AudioFile = LabelledTextField;
export type Pronunciation = {
	transcriptions: Transcription[];
	audioFiles: AudioFile[];
	rhymes: string[];
	homophones: string[];
	hyphenation: string[];
};
export type Production = string;

export type EntrySections = {
	// "Headings before the definitions"
	description: Description;
	glyphOrigin: GlyphOrigin;
	etymology: Etymology;
	pronunciation: Partial<Pronunciation>;
	production: Production;
	/**
	 * @remarks
	 * Not present in headings after definitions.
	 */
	definitions: Definition[];
};

export type Sections = SharedSections & EntrySections;
export type SectionType = keyof Sections;

/**
 * @see https://en.wiktionary.org/wiki/Wiktionary:Entry_layout#Part_of_speech
 */
export type StandardPartsOfSpeech =
	// Parts of speech
	| "adjective"
	| "adverb"
	| "ambiposition"
	| "article"
	| "circumposition"
	| "classifier"
	| "conjunction"
	| "contraction"
	| "counter"
	| "determiner"
	| "ideophone"
	| "interjection"
	| "noun"
	| "numeral"
	| "participle"
	| "particle"
	| "postposition"
	| "preposition"
	| "pronoun"
	| "proper-noun"
	| "verb"
	// Morphemes
	| "circumfix"
	| "combining-form"
	| "infix"
	| "interfix"
	| "prefix"
	| "root"
	| "suffix"
	// Symbols and characters
	| "diacritical-mark"
	| "letter"
	| "ligature"
	| "number"
	| "punctuation-mark"
	| "syllable"
	| "symbol"
	// Phrases
	| "phrase"
	| "proverb"
	| "prepositional-phrase"
	// Han characters and language-specific varieties
	| "han-character"
	| "hanzi"
	| "kanji"
	| "hanja"
	// Other
	| "romanization"
	| "logogram"
	| "determinative";
export type DisallowedPartOfSpeech =
	| "abbreviation"
	| "acronym"
	| "initialism"
	| "cardinal-number"
	| "ordinal-number"
	| "cardinal-numeral"
	| "ordinal-numeral"
	| "clitic"
	| "gerund"
	| "idiom";

export type PartOfSpeech = "adposition" | "affix" | "character" | StandardPartsOfSpeech | DisallowedPartOfSpeech;

export type Entry = {
	lemma: Lemma;
	partOfSpeech?: PartOfSpeech;
} & Partial<EntrySections & SharedSections>;
