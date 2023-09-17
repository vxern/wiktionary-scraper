import * as cheerio from "cheerio";
import { Quotation } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";

// TODO(vxern): Implement.
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Quotation[] | undefined {
	return undefined;
}
