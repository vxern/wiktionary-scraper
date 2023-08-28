import { describe, it } from "mocha";
import * as Wiktionary from "../src/index.js";
import { expect } from "chai";

describe("The parser", () => {
	it("returns `undefined` for terms that do not exist.", async () => {
		const results = await Wiktionary.get("this.is.a.string.that.does.not.exist");

		expect(results).to.be.undefined;
	});

	it("returns English results for terms that do exist.", async () => {
		const results = await Wiktionary.get("o");

		expect(results).to.not.be.undefined;
	});

	it("returns results for terms in a language different to English.", async () => {
		const results = await Wiktionary.get("o", { lemmaLanguage: "Romanian" });

		expect(results).to.not.be.undefined;
	});

	it("returns `undefined` for redirects when following redirects is disabled.", async () => {
		const results = await Wiktionary.get("germany");

		expect(results).to.be.undefined;
	});

	it("returns results for redirects when following redirects is enabled.", async () => {
		const results = await Wiktionary.get("a", { followRedirect: true });

		expect(results).to.not.be.undefined;
	});
});
