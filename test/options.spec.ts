import { describe, it } from "mocha";
import { expect } from "chai";
import { withDefaults } from "../src/options.js";

describe("withDefaults()", () => {
	it("should fill with defaults.", () => {
		const options = withDefaults({});

		expect(options).to.eql({
			lemmaLanguage: "English",
			siteLanguage: "en",
			userAgent: "wiktionary-scraper (https://github.com/vxern/wiktionary-scraper)",
			followRedirect: false,
		});
	});

	it("should not overwrite provided values.", () => {
		const options = withDefaults({ followRedirect: true, userAgent: "User-Agent" });

		expect(options).to.eql({
			lemmaLanguage: "English",
			siteLanguage: "en",
			userAgent: "User-Agent",
			followRedirect: true,
		});
	});
});
