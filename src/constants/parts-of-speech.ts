import { SiteLanguage } from "../options.js";
import english from "./parts-of-speech/english.js";

export default {
	en: english,
} satisfies Record<SiteLanguage, unknown>;
