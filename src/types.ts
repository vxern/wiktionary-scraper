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
export type Composition = LabelledTextField;
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

type SharedSections = {
	usageNotes: UsageNotes;
	reconstructionNotes: ReconstructionNotes;
} & Inflections & {
		composition: Composition[];
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
	paragraphs?: string[];
	listEntries?: string[];
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

export type PartOfSpeech =
	| "abbreviation"
	| "abbreviation/acronym"
	| "abbreviation/initialism"
	| "adjective"
	| "adjective/demonstrative"
	| "adjective/exclamative"
	| "adjective/indefinite"
	| "adjective/interrogative"
	| "adjective/numeral"
	| "adjective/possessive"
	| "adjective/relative"
	| "adposition"
	| "adposition/ambiposition"
	| "adposition/circumposition"
	| "adposition/postposition"
	| "adposition/preposition"
	| "adverb"
	| "adverb/indefinite"
	| "adverb/interrogative"
	| "adverb/conjunction"
	| "adverb/local"
	| "adverb/pronominal"
	| "adverb/temporal"
	| "affix"
	| "affix/circumfix"
	| "affix/infix"
	| "affix/interfix"
	| "affix/prefix"
	| "affix/suffix"
	| "affixoid"
	| "affixoid/prefixoid"
	| "affixoid/suffixoid"
	| "character"
	| "character/logogram"
	| "character/logogram/chinese"
	| "character/logogram/hanzi"
	| "character/logogram/kanji"
	| "character/logogram/hanja"
	| "classifier"
	| "clitic"
	| "clitic/proclitic"
	| "clitic/enclitic"
	| "clitic/endoclitic"
	| "collocation"
	| "collocation/adjectival"
	| "collocation/adverbial"
	| "collocation/catchphrase"
	| "collocation/greeting"
	| "collocation/idiom"
	| "collocation/mnemonic"
	| "collocation/nominal"
	| "collocation/proverb"
	| "collocation/verbal"
	| "combining-form"
	| "contraction"
	| "counter"
	| "determinative"
	| "determiner"
	| "determiner/article"
	| "determiner/article/indefinite"
	| "determiner/article/definite"
	| "determiner/article/partitive"
	| "determiner/quantifier"
	| "ideophone"
	| "inflection"
	| "inflection/declined"
	| "junction"
	| "junction/conjunction"
	| "junction/conjunction/coordinate"
	| "junction/subjunction"
	| "letter"
	| "ligature"
	| "lojban/gismu"
	| "lojban/rafsi"
	| "noun"
	| "noun/classifier"
	| "noun/proper"
	| "noun/proper/brand"
	| "noun/proper/father"
	| "noun/proper/first"
	| "noun/proper/last"
	| "noun/proper/place"
	| "noun/proper/street"
	| "numeral"
	| "numeral/adverbial"
	| "numeral/cardinal"
	| "numeral/collective"
	| "numeral/fractional"
	| "numeral/multiplier"
	| "numeral/ordinal"
	| "numeral/variative"
	| "particle"
	| "particle/answer"
	| "particle/comparative"
	| "particle/degree"
	| "particle/focus"
	| "particle/interjection"
	| "particle/interjection/onomatopoeia"
	| "particle/modal"
	| "particle/negation"
	| "phrase"
	| "phrase/adpositional"
	| "pronoun"
	| "pronoun/demonstrative"
	| "pronoun/indefinite"
	| "pronoun/interrogative"
	| "pronoun/personal"
	| "pronoun/possessive"
	| "pronoun/reciprocal"
	| "pronoun/reflexive"
	| "pronoun/relative"
	| "radical"
	| "romanization"
	| "root"
	| "syllable"
	| "symbol"
	| "symbol/diacritic"
	| "symbol/numeral"
	| "symbol/punctuation"
	| "verb"
	| "verb/conjugated"
	| "verb/gerund"
	| "verb/gerund/declined"
	| "verb/infinitive"
	| "verb/infinitive/extended"
	| "verb/participle"
	| "verb/phrasal"
	| "verb/supine"
	| "unknown";

export type Entry = {
	lemma: Lemma;
	partOfSpeech?: PartOfSpeech;
} & Partial<EntrySections & SharedSections>;

export type EntrySectionSkeleton = {
	id: string;
	name: string;
	sections: EntrySectionSkeleton[];
};

export type SectionTypeTuple = [sectionType: SectionType, skeleton: EntrySectionSkeleton];
export type SectionNameTuple = [sectionName: string, skeleton: EntrySectionSkeleton];

export interface QueryResult {
	entries: Entry[];
	redirected: boolean;
}
