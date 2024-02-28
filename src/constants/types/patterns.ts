export default {
	multipleWhitespace: /\s{2,}/g,
	// e.g. "Etymology" -> "Etymology", undefined
	// e.g. "Etymology 1" -> "Etymology", "1"
	sectionName: /^([^0-9,]+)(?: ([0-9]{1,}))?$/,
	// e.g. "verb, noun" -> ok
	sectionNameMultiple: /^([^,]+)(, [^,]+)+?$/,
	// e.g. "Sample sentence." -> undefined, "Sample sentence."
	// e.g. "(historical, uncommon, regional) Sample sentence." -> "historical, uncommon, regional", "Sample sentence."
	withPrefixedLabels: /^(?:\(([^()]+)\) ?)? ?(.+)$/,
	// e.g. "Sample sentence." -> "Sample sentence.", undefined
	// e.g. "Sample sentence. (dated)" -> "Sample sentence.", "dated"
	withSuffixedLabels: /^(.+?) ?(?:\(([^()]+)\) ?)?$/,
	// e.g. "historical, uncommon, regional"
	// e.g. "historical,uncommon,regional"
	labelSeparator: /, ?/g,
	// e.g. "(historical) Sample sentence; (uncommon) Different sample sentence."
	// e.g. "(historical) Sample sentence;(uncommon) Different sample sentence."
	fieldSeparator: /; ?/g,
};
