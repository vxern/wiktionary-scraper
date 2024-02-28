import * as cheerio from "cheerio";
import { describe, it, before } from "mocha";
import * as Wiktionary from "../../../src/index.js";
import { expect } from "chai";
import { fetchSkeleton } from "../../common.js";

const options = Wiktionary.withDefaults({
	siteLanguage: "de",
	lemmaLanguage: "Deutsch",
});

describe("resolveEntrySkeletons()", () => {
	let $: cheerio.CheerioAPI;

	before(async () => {
		const result = await Wiktionary.fetchPageContents("um", options);
		if (result === undefined) {
			throw "Failed to fetch contents for page.";
		}

		$ = cheerio.load(result.contents);
	});

	it("should resolve entry skeletons.", () => {
		const skeletons = Wiktionary.resolveSkeletons($, options);

		expect(skeletons).to.not.be.undefined;
		expect(skeletons).to.eql([
			{
				id: "#um_(Deutsch)",
				name: "Deutsch",
				sections: [
					{
						id: "#Präposition_mit_Akkusativ",
						name: "Präposition",
						sections: [
							{
								id: "Worttrennung:",
								name: "Worttrennung",
								sections: [],
							},
							{
								id: "Aussprache:",
								name: "Aussprache",
								sections: [],
							},
							{
								id: "Bedeutungen:",
								name: "Bedeutungen",
								sections: [],
							},
							{
								id: "Herkunft:",
								name: "Herkunft",
								sections: [],
							},
							{
								id: "Synonyme:",
								name: "Synonyme",
								sections: [],
							},
							{
								id: "Beispiele:",
								name: "Beispiele",
								sections: [],
							},
							{
								id: "Charakteristische Wortkombinationen:",
								name: "Charakteristische Wortkombinationen",
								sections: [],
							},
							{
								id: "Wortbildungen:",
								name: "Wortbildungen",
								sections: [],
							},
							{
								id: "Referenzen und weiterführende Informationen:",
								name: "Referenzen und weiterführende Informationen",
								sections: [],
							},
						],
					},
					{
						id: "#Subjunktion",
						name: "Subjunktion",
						sections: [
							{
								id: "Anmerkung:",
								name: "Anmerkung",
								sections: [],
							},
							{
								id: "Worttrennung:",
								name: "Worttrennung",
								sections: [],
							},
							{
								id: "Aussprache:",
								name: "Aussprache",
								sections: [],
							},
							{
								id: "Bedeutungen:",
								name: "Bedeutungen",
								sections: [],
							},
							{
								id: "Beispiele:",
								name: "Beispiele",
								sections: [],
							},
							{
								id: "Übersetzungen",
								name: "Übersetzungen",
								sections: [],
							},
							{
								id: "Referenzen und weiterführende Informationen:",
								name: "Referenzen und weiterführende Informationen",
								sections: [],
							},
						],
					},
				],
			},
			{
				id: "um_(Färöisch)",
				name: "Färöisch",
				sections: [
					{
						id: "#Adverb",
						name: "Adverb",
						sections: [
							{
								id: "Worttrennung:",
								name: "Worttrennung",
								sections: [],
							},
							{
								id: "Aussprache:",
								name: "Aussprache",
								sections: [],
							},
							{
								id: "Bedeutungen:",
								name: "Bedeutungen",
								sections: [],
							},
							{
								id: "Beispiele:",
								name: "Beispiele",
								sections: [],
							},
							{
								id: "Übersetzungen",
								name: "Übersetzungen",
								sections: [],
							},
							{
								id: "Referenzen und weiterführende Informationen:",
								name: "Referenzen und weiterführende Informationen",
								sections: [],
							},
						],
					},
					{
						id: "#Präposition",
						name: "Präposition",
						sections: [
							{ id: "Worttrennung:", name: "Worttrennung", sections: [] },
							{ id: "Aussprache:", name: "Aussprache", sections: [] },
							{ id: "Bedeutungen:", name: "Bedeutungen", sections: [] },
							{ id: "Herkunft:", name: "Herkunft", sections: [] },
							{ id: "Beispiele:", name: "Beispiele", sections: [] },
							{ id: "Charakteristische Wortkombinationen:", name: "Charakteristische Wortkombinationen", sections: [] },
							{ id: "Übersetzungen", name: "Übersetzungen", sections: [] },
							{
								id: "Referenzen und weiterführende Informationen:",
								name: "Referenzen und weiterführende Informationen",
								sections: [],
							},
						],
					},
					{
						id: "#Präposition",
						name: "Präposition",
						sections: [
							{ id: "Worttrennung:", name: "Worttrennung", sections: [] },
							{ id: "Aussprache:", name: "Aussprache", sections: [] },
							{ id: "Bedeutungen:", name: "Bedeutungen", sections: [] },
							{ id: "Beispiele:", name: "Beispiele", sections: [] },
							{ id: "Übersetzungen", name: "Übersetzungen", sections: [] },
							{
								id: "Referenzen und weiterführende Informationen:",
								name: "Referenzen und weiterführende Informationen",
								sections: [],
							},
						],
					},
				],
			},
		] satisfies Wiktionary.EntrySectionSkeleton[]);
	});
});

describe("resolveSections()", () => {
	let skeleton: Wiktionary.EntrySectionSkeleton;

	before(async () => {
		[, skeleton] = await fetchSkeleton("twin", options);
	});

	it("should resolve known sections.", () => {
		const sections = Wiktionary.resolveSections(skeleton, options);

		expect(sections.known).to.eql([
			[
				"alternativeForms",
				{
					id: "#Alternative_forms",
					name: "Alternative forms",
					sections: [],
				},
			],
			[
				"pronunciation",
				{
					id: "#Pronunciation",
					name: "Pronunciation",
					sections: [],
				},
			],
			[
				"etymology",
				{
					id: "#Etymology_1",
					name: "Etymology 1",
					sections: [
						{
							id: "#Noun",
							name: "Noun",
							sections: [
								{
									id: "#Synonyms",
									name: "Synonyms",
									sections: [],
								},
								{
									id: "#Derived_terms",
									name: "Derived terms",
									sections: [],
								},
								{
									id: "#Translations",
									name: "Translations",
									sections: [],
								},
								{
									id: "#See_also",
									name: "See also",
									sections: [],
								},
							],
						},
						{
							id: "#Verb",
							name: "Verb",
							sections: [
								{
									id: "#See_also_2",
									name: "See also",
									sections: [],
								},
							],
						},
					],
				},
			],
			[
				"etymology",
				{
					id: "#Etymology_2",
					name: "Etymology 2",
					sections: [
						{
							id: "#Adjective",
							name: "Adjective",
							sections: [
								{
									id: "#Synonyms_2",
									name: "Synonyms",
									sections: [],
								},
								{
									id: "#Derived_terms_2",
									name: "Derived terms",
									sections: [],
								},
								{
									id: "#Translations_2",
									name: "Translations",
									sections: [],
								},
							],
						},
					],
				},
			],
			[
				"furtherReading",
				{
					id: "#Further_reading",
					name: "Further reading",
					sections: [],
				},
			],
			[
				"anagrams",
				{
					id: "#Anagrams",
					name: "Anagrams",
					sections: [],
				},
			],
		] satisfies Wiktionary.SectionTypeTuple[]);
		expect(sections.unknown).to.be.empty;
	});

	it("should resolve unknown (not immediately recognised) sections.", () => {
		const etymologySkeleton = skeleton.sections.find((section) => section.id === "#Etymology_1");
		if (etymologySkeleton === undefined) {
			throw "Failed to resolve first etymology section.";
		}

		const sections = Wiktionary.resolveSections(etymologySkeleton, options);

		expect(sections.known).to.be.empty;
		expect(sections.unknown).to.eql([
			[
				"Noun",
				{
					id: "#Noun",
					name: "Noun",
					sections: [
						{
							id: "#Synonyms",
							name: "Synonyms",
							sections: [],
						},
						{
							id: "#Derived_terms",
							name: "Derived terms",
							sections: [],
						},
						{
							id: "#Translations",
							name: "Translations",
							sections: [],
						},
						{
							id: "#See_also",
							name: "See also",
							sections: [],
						},
					],
				},
			],
			[
				"Verb",
				{
					id: "#Verb",
					name: "Verb",
					sections: [
						{
							id: "#See_also_2",
							name: "See also",
							sections: [],
						},
					],
				},
			],
		] satisfies Wiktionary.SectionNameTuple[]);
	});
});
