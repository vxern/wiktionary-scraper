import * as cheerio from "cheerio";
import { before, describe, it } from "mocha";
import { expect } from "chai";
import * as Wiktionary from "../../../src/index.js";
import { fetchSkeleton } from "../../common.js";

const options = Wiktionary.withDefaults({
	siteLanguage: "en",
	lemmaLanguage: "English",
});

describe("parseSection()", () => {
	let $: cheerio.CheerioAPI;

	before(async () => {
		const result = await Wiktionary.fetchPageContents("twin", options);
		if (result === undefined) {
			throw "Failed to fetch contents for page.";
		}

		$ = cheerio.load(result.contents);
	});

	it("should parse the definitions.", () => {
		const results = Wiktionary.parseSection<"definitions">(
			$,
			{
				id: "#Noun",
				name: "Noun",
				sections: [],
			},
			"definitions",
			options,
		);

		expect(results).to.eql([
			{
				fields: [
					{
						value:
							"Either of two people (or, less commonly, animals) who shared the same uterus at the same time; one who was born at the same birth as a sibling.",
					},
				],
			},
			{ fields: [{ value: "Either of two similar or closely related objects, entities etc." }] },
			{ fields: [{ value: "A room in a hotel, guesthouse, etc. with two beds; a twin room." }] },
			{ fields: [{ labels: ["US"], value: "A twin size mattress or a bed designed for such a mattress." }] },
			{ fields: [{ labels: ["aviation"], value: "A two-engine aircraft." }] },
			{ fields: [{ labels: ["crystallography"], value: "A twin crystal." }] },
		] satisfies Wiktionary.Definition[]);
	});

	it("should parse the etymology.", () => {
		const result = Wiktionary.parseSection<"etymology">(
			$,
			{
				id: "#Etymology_1",
				name: "Etymology 1",
				sections: [],
			},
			"etymology",
			options,
		);

		expect(result).to.eql({
			paragraphs: [
				"From Middle English twinne, twynne, from Old English ġetwin, ġetwinn (“twin, multiple”, noun) and twinn (“twin, two-fold, double, two by two”, adjective), from Proto-Germanic *twinjaz, *twinaz (“two each”), from Proto-Indo-European *dwino- (“twin”), from *dwóh₁ (“two”). Cognate with Scots twyn (“twin”), Dutch tweeling (“twin”), German Zwilling (“twin”), Swedish tvilling (“twin”), Faroese tvinnur (“a double set”), Icelandic tvenna (“duo, pair”), Lithuanian dvynys (“twin”), Russian двойня (dvojnja, “twin”).",
			],
		} satisfies Wiktionary.Etymology);
	});

	it("should parse the description.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the glyph origin.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the pronunciation.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the production.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the usage notes.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the reconstruction notes.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the inflection.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the conjugation.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the declension.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the mutation.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the quotations.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the alternative forms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the alternative reconstructions.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the synonyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the antonyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the hypernyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the hyponyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the meronyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the holonyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the comeronyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the troponyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the parasynonyms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the coordinate terms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the derived terms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the related terms.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the collocations.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the descendants.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the translations.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the trivia.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the see also section.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the references.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the further reading section.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the anagrams.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});

	it("should parse the examples.", () => {
		const result = undefined;

		expect(result).to.be.undefined;
	});
});

describe("parse()", () => {
	it("should parse all sections.", async () => {
		const [$, skeleton] = await fetchSkeleton("twin", options);

		const result = Wiktionary.parse($, skeleton, { value: "twin" }, options);

		expect(result).to.not.equal(undefined);
		expect(result).to.eql([
			{
				lemma: { value: "twin" },
				partOfSpeech: "noun",
				definitions: [
					{
						fields: [
							{
								value:
									"Either of two people (or, less commonly, animals) who shared the same uterus at the same time; one who was born at the same birth as a sibling.",
							},
						],
					},
					{ fields: [{ value: "Either of two similar or closely related objects, entities etc." }] },
					{ fields: [{ value: "A room in a hotel, guesthouse, etc. with two beds; a twin room." }] },
					{ fields: [{ labels: ["US"], value: "A twin size mattress or a bed designed for such a mattress." }] },
					{ fields: [{ labels: ["aviation"], value: "A two-engine aircraft." }] },
					{ fields: [{ labels: ["crystallography"], value: "A twin crystal." }] },
				],
				etymology: {
					paragraphs: [
						"From Middle English twinne, twynne, from Old English ġetwin, ġetwinn (“twin, multiple”, noun) and twinn (“twin, two-fold, double, two by two”, adjective), from Proto-Germanic *twinjaz, *twinaz (“two each”), from Proto-Indo-European *dwino- (“twin”), from *dwóh₁ (“two”). Cognate with Scots twyn (“twin”), Dutch tweeling (“twin”), German Zwilling (“twin”), Swedish tvilling (“twin”), Faroese tvinnur (“a double set”), Icelandic tvenna (“duo, pair”), Lithuanian dvynys (“twin”), Russian двойня (dvojnja, “twin”).",
					],
				},
			},
			{
				lemma: { value: "twin" },
				partOfSpeech: "verb",
				definitions: [
					{ fields: [{ labels: ["transitive", "obsolete outside Scotland"], value: "To separate, divide." }] },
					{
						fields: [
							{ labels: ["intransitive", "obsolete outside Scotland"], value: "To split, part; to go away, depart." },
						],
					},
					{
						fields: [
							{
								labels: ["usually in the passive"],
								value:
									"To join, unite; to form links between (now especially of two places in different countries); to pair with.",
							},
						],
					},
					{ fields: [{ labels: ["intransitive"], value: "To give birth to twins." }] },
					{
						fields: [
							{ labels: ["transitive"], value: "To be, or be like, a twin to (someone else); to match in some way." },
						],
					},
					{
						fields: [
							{
								labels: ["intransitive"],
								value:
									"To be, or be like, a pair of twins (for example, to dress identically); to be paired or suited.",
							},
						],
					},
				],
				etymology: {
					paragraphs: [
						"From Middle English twinne, twynne, from Old English ġetwin, ġetwinn (“twin, multiple”, noun) and twinn (“twin, two-fold, double, two by two”, adjective), from Proto-Germanic *twinjaz, *twinaz (“two each”), from Proto-Indo-European *dwino- (“twin”), from *dwóh₁ (“two”). Cognate with Scots twyn (“twin”), Dutch tweeling (“twin”), German Zwilling (“twin”), Swedish tvilling (“twin”), Faroese tvinnur (“a double set”), Icelandic tvenna (“duo, pair”), Lithuanian dvynys (“twin”), Russian двойня (dvojnja, “twin”).",
					],
				},
			},
			{
				lemma: { value: "twin" },
				partOfSpeech: "adjective",
				definitions: [
					{ fields: [{ value: "Double; dual; occurring as a matching pair." }] },
					{ fields: [{ value: "Forming a pair of twins." }] },
				],
				etymology: {
					paragraphs: [
						"From Middle English *twin, *twyn, from Old English twin, twinn (“twin; double”, adjective), from Proto-Germanic *twīhnaz (“occurring in a pair; twofold; double”), from Proto-Indo-European *dwóh₁ (“two”). Cognate with Icelandic tvennur (“double”), Gothic 𐍄𐍅𐌴𐌹𐌷𐌽𐌰𐌹 (tweihnai, “two each”).",
					],
				},
			},
		] satisfies Wiktionary.Entry[]);
	});

	it("should parse a result for an entry with 1 etymology and 1 part of speech.", async () => {
		const [$, skeleton] = await fetchSkeleton("United Kingdom", options);

		const result = Wiktionary.parse($, skeleton, { value: "United Kingdom" }, options);

		expect(result).to.not.equal(undefined);
		expect(result).to.eql([
			{
				etymology: { paragraphs: ["From united +‎ kingdom, first attested from 1706."] },
				lemma: { value: "United Kingdom" },
				partOfSpeech: "noun/proper",
				definitions: [
					{
						fields: [
							{
								value:
									"A kingdom and sovereign state in Western Europe comprising the four countries of England, Scotland and Wales on the island of Great Britain, and Northern Ireland on the northeastern portion of the island of Ireland since 1922.",
							},
						],
					},
					{
						fields: [{ labels: ["historical"], value: "The United Kingdom of Great Britain and Ireland (1801–1922)." }],
					},
					{
						fields: [
							{ labels: ["historical", "informal", "nonstandard"], value: "The Kingdom of Great Britain (1707–1801)." },
						],
					},
					{
						fields: [
							{
								labels: ["nation's name"],
								value: "Kingdom consisting of several constituencies, actual, historical, or hypothetical.",
							},
						],
					},
				],
			},
		] satisfies Wiktionary.Entry[]);
	});

	it("should parse a result for an entry with 1 etymology and many parts of speech.", async () => {
		const [$, skeleton] = await fetchSkeleton("Haus", { ...options, lemmaLanguage: "German" });

		const result = Wiktionary.parse($, skeleton, { value: "Haus" }, { ...options, lemmaLanguage: "German" });

		expect(result).to.not.equal(undefined);
		expect(result).to.eql([
			{
				etymology: {
					paragraphs: [
						"From Middle High German hūs, from Old High German hūs, from Proto-West Germanic *hūs, from Proto-Germanic *hūsą.",
						"Cognate with Old Frisian hūs, Low German Hus, Huus, Dutch huis, Icelandic hús, Faroese hús, Danish hus, Norwegian hus, Swedish hus, English house. Doublet of House.",
					],
				},
				lemma: { value: "Haus" },
				partOfSpeech: "noun",
				definitions: [
					{ fields: [{ value: "house" }] },
					{ fields: [{ value: "home (in various phrases)" }] },
					{ fields: [{ value: "theatre" }] },
				],
			},
			{
				etymology: {
					paragraphs: [
						"From Middle High German hūs, from Old High German hūs, from Proto-West Germanic *hūs, from Proto-Germanic *hūsą.",
						"Cognate with Old Frisian hūs, Low German Hus, Huus, Dutch huis, Icelandic hús, Faroese hús, Danish hus, Norwegian hus, Swedish hus, English house. Doublet of House.",
					],
				},
				lemma: { value: "Haus" },
				partOfSpeech: "noun/proper",
				definitions: [{ fields: [{ value: "A municipality of Styria, Austria" }] }],
			},
		] satisfies Wiktionary.Entry[]);
	});

	it("should parse a result for an entry with many etymologies and 1 or more parts of speech.", async () => {
		const [$, skeleton] = await fetchSkeleton("a", options);

		const result = Wiktionary.parse($, skeleton, { value: "a" }, options);

		expect(result).to.not.equal(undefined);
		expect(result).to.eql([
			{
				lemma: { value: "a" },
				partOfSpeech: "letter",
				definitions: [
					{ fields: [{ value: "The first letter of the English alphabet, written in the Latin script." }] },
				],
				etymology: {
					paragraphs: [
						"From Middle English and Old English lower case letter a and split of Middle English and Old English lower case letter æ.",
					],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "numeral",
				definitions: [
					{
						fields: [
							{
								value:
									"The ordinal number first, derived from this letter of the English alphabet, called a and written in the Latin script.",
							},
						],
					},
				],
				etymology: {
					paragraphs: [
						"From Middle English and Old English lower case letter a and split of Middle English and Old English lower case letter æ.",
					],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "noun",
				definitions: [{ fields: [{ value: "The name of the Latin script letter A / a." }] }],
				etymology: {
					paragraphs: [
						"From Middle English and Old English lower case letter a and split of Middle English and Old English lower case letter æ.",
					],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "determiner/article",
				definitions: [
					{ fields: [{ value: "One; any indefinite example of. [from before 1150][2]" }] },
					{ fields: [{ value: "One; used before score, dozen, hundred, thousand, million, etc." }] },
					{
						fields: [
							{
								value:
									"Used in some phrases denoting quantity, such as a few, a good many, a couple, a little (for an uncountable noun), etc.",
							},
						],
					},
					{
						fields: [
							{
								value: "Used in some adverbial phrases denoting degree or extent, such as a little, a bit, a lot, etc.",
							},
						],
					},
					{
						fields: [
							{ value: "The same; one and the same. Used in phrases such as of a kind, birds of a feather, etc." },
						],
					},
					{ fields: [{ value: "Any; every; used before a noun which has become modified to limit its scope.[1]" }] },
					{ fields: [{ value: "Any; used with a negative to indicate not a single one.[3]" }] },
					{
						fields: [
							{ value: "Used before an adjective that modifies a noun (singular or plural) delimited by a numeral." },
						],
					},
					{
						fields: [
							{
								value:
									"One; someone named; used before a person's name, suggesting that the speaker knows little about the person other than the name.[4]",
							},
						],
					},
					{ fields: [{ value: "Used before an adjective modifying a person's name." }] },
					{
						fields: [
							{
								value:
									"Someone or something like; similar to; [3] Used before a proper noun to create an example out of it.",
							},
						],
					},
				],
				etymology: {
					paragraphs: [
						'From Middle English a, an, from Old English ān (“one; a; lone; sole”). The "n" was gradually lost before consonants in almost all dialects by the 15th century.',
					],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "adposition/preposition",
				definitions: [
					{ fields: [{ value: "To do with separation; In, into. [from before 1150][2]" }] },
					{
						fields: [
							{
								value:
									"To do with time; Each, per, in, on, by. Often occurs between two nouns, where the first noun occurs at the end of a verbal phrase.[from before 1150][2]",
							},
						],
					},
					{ fields: [{ value: "To do with status; In. [from before 1150][2]" }] },
					{
						fields: [
							{
								labels: ["archaic"],
								value: "To do with position or direction; In, on, at, by, towards, onto. [from before 1150][2]",
							},
						],
					},
					{
						fields: [
							{
								labels: ["archaic"],
								value: "To do with process, with a passive verb; In the course of, experiencing. [from before 1150][2]",
							},
						],
					},
					{
						fields: [{ labels: ["archaic"], value: "To do with an action, an active verb; Engaged in. [16th c.][2]" }],
					},
					{ fields: [{ labels: ["archaic"], value: "To do with an action/movement; To, into. [16th c.][2]" }] },
					{ fields: [{ labels: ["obsolete"], value: "To do with method; In, with. [from before 1150][2]" }] },
					{ fields: [{ labels: ["obsolete"], value: "To do with role or capacity; In. [from before 1150][2]" }] },
				],
				etymology: {
					listEntries: ["From Middle English a, o, from Old English a-, an, on.", "Unstressed form of on."],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "verb",
				definitions: [
					{
						fields: [
							{
								labels: ["archaic or slang"],
								value: "Have. [between 1150 and 1350, continued in some use until 1650; used again after 1950]",
							},
						],
					},
				],
				etymology: { paragraphs: ["From Middle English a, ha contraction of have, or haven."] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "pronoun",
				definitions: [
					{
						fields: [
							{
								labels: ["obsolete outside England and Scotland dialects"],
								value: "He, or sometimes she, it. [1150–1900][2] (clarification of this definition is needed)",
							},
						],
					},
				],
				etymology: {
					paragraphs: [
						"From Middle English a, a reduced form of he (“he”)/ha (“he”), heo (“she”)/ha (“she”) and ha (“it”) (as well as of hie, hie (“they”)).",
					],
				},
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "adposition/preposition",
				definitions: [{ fields: [{ labels: ["archaic or slang"], value: "Of." }] }],
				etymology: { paragraphs: ["From Middle English of, with apocope of the final f and vowel reduction."] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "adverb",
				definitions: [{ fields: [{ labels: ["chiefly Scotland"], value: "All. [from ca. 1350—1470]" }] }],
				etymology: { paragraphs: ["From Northern Middle English aw, alteration of all."] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "adjective",
				definitions: [{ fields: [{ labels: ["chiefly Scotland"], value: "All. [from ca. 1350—1470]" }] }],
				etymology: { paragraphs: ["From Northern Middle English aw, alteration of all."] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "symbol",
				definitions: [
					{ fields: [{ value: "Distance from leading edge to aerodynamic center." }] },
					{ fields: [{ value: "specific absorption coefficient" }] },
					{ fields: [{ value: "specific rotation" }] },
					{ fields: [{ value: "allele (recessive)" }] },
				],
				etymology: { paragraphs: ["Symbols"] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "adverb",
				definitions: [
					{ fields: [{ labels: ["crosswords"], value: "across" }] },
					{ fields: [{ labels: ["chiefly US"], value: "Alternative spelling of a.m. (“ante meridiem”) or am" }] },
				],
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "particle",
				definitions: [
					{
						fields: [
							{ value: "Alternative form of -a (“empty syllable added to songs, poetry, verse and other speech”)" },
						],
					},
				],
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "noun",
				definitions: [{ fields: [{ value: "The name of the Cyrillic script letter А / а." }] }],
				etymology: { paragraphs: ["Borrowed from Russian а (a)."] },
			},
			{
				lemma: { value: "a" },
				partOfSpeech: "particle/interjection",
				definitions: [{ fields: [{ value: "ah; er (sound of hesitation)" }] }],
			},
		] satisfies Wiktionary.Entry[]);
	});
});
