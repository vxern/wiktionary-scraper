export default {
	didYouMean: "#did-you-mean > a",
	tableOfContents: {
		tableOfContents: "div#toc",
		entries: {
			entries: (depth: number) => `li.toclevel-${depth + 1}`,
			root: {
				root: "a",
				text: ".toctext",
			},
		},
	},
	section: ".mw-heading, .mw-heading2, .mw-heading3, .mw-heading4, .mw-heading5, .mw-heading6",
	definitions: {
		heading: {
			heading: "p",
			headword: "strong",
		},
		definitions: {
			examples: {
				list: "dl",
				examples: "dd",
			},
			quotations: {
				list: "ul",
				quotations: "li",
			},
			definitions: {
				list: "ol",
				definitions: "li",
			},
		},
	},
	etymology: {
		paragraph: "p",
		lists: {
			unordered: "ul",
			ordered: "ol",
			elements: "li",
		},
	},
};
