import { AlternativeReconstruction } from "../../types.js";
import * as cheerio from "cheerio";
import { EntrySectionSkeleton } from "../parser.js";

// TODO(vxern): Implement.
export default function parse(
	_: cheerio.CheerioAPI,
	__: EntrySectionSkeleton,
): AlternativeReconstruction[] | undefined {
	return undefined;
}
