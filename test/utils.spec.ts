import { describe, it } from "mocha";
import { expect } from "chai";
import { getCleaned, getFilled, getReversed } from "../src/utils.js";

describe("getReversed()", () => {
	it("should reverse the role of the keys and values in an object.", () => {
		const reversed = getReversed({ one: "1", two: "2", three: "3" });

		expect(reversed).to.eql({ "1": "one", "2": "two", "3": "three" });
	});

	it("should throw an exception if there is a duplicate value.", () => {
		expect(() => getReversed({ one: "1", two: "3", three: "3" })).to.throw;
	});
});

describe("getFilled()", () => {
	it("should copy missing properties.", () => {
		const filled = getFilled({ one: "1", two: "2" }, { three: "3" });

		expect(filled).to.eql({ one: "1", two: "2", three: "3" });
	});

	it("should deeply copy missing properties.", () => {
		const filled = getFilled({ object: { one: "1" } }, { object: { two: "2" } });

		expect(filled).to.eql({ object: { one: "1", two: "2" } });
	});

	it("should not replace existing properties.", () => {
		const filled = getFilled({ one: "1", two: "2" }, { one: "one", two: "two", three: "three" });

		expect(filled).to.eql({ one: "1", two: "2", three: "three" });
	});

	it("should combine arrays.", () => {
		const filled = getFilled({ array: ["one"] }, { array: ["two"] });

		expect(filled).to.eql({ array: ["one", "two"] });
	});
});

describe("getCleaned()", () => {
	it("should remove leading and trailing whitespace.", () => {
		const cleaned = getCleaned("  Sample sentence.  ");

		expect(cleaned).to.eql("Sample sentence.");
	});

	it("should remove surplus whitespace.", () => {
		const cleaned = getCleaned("Sample   sentence.");

		expect(cleaned).to.eql("Sample sentence.");
	});
});
