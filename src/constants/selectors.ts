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
	section: "h1, h2, h3, h4, h5, h6",
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
