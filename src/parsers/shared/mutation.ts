import * as cheerio from "cheerio";
import { Mutation } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";

// TODO(vxern): Implement.
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Mutation | undefined {
	return undefined;
}
