import { describe, it } from "mocha";
import { expect } from "chai";
import * as Wiktionary from "../src/index.js";

describe("fetchPageContents()", () => {
	it("should yield a result for a term that exists.", async () => {
		const result = await Wiktionary.fetchPageContents("Germany");

		expect(result).to.not.be.undefined;
	});

	it("should yield `undefined` for a term that does not exist.", async () => {
		const result = await Wiktionary.fetchPageContents("Kermany");

		expect(result).to.be.undefined;
	});

	it("should yield a result for a term with a redirect when following redirects.", async () => {
		const result = await Wiktionary.fetchPageContents("germany", Wiktionary.withDefaults({ followRedirect: true }));

		expect(result).to.not.be.undefined;
	});

	it("should yield `undefined` for a term with a redirect when not following redirects.", async () => {
		const result = await Wiktionary.fetchPageContents("germany");

		expect(result).to.be.undefined;
	});
});
