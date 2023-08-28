import { SiteLanguage } from "../options.js";
import english from "./sections/english.js";

export default {
	en: english,
} satisfies Record<SiteLanguage, unknown>;
