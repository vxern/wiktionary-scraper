import { SectionType } from "../../types.js";
import { getReversed } from "../../utils.js";

/**
 * @see https://de.wiktionary.org/wiki/Hilfe:Formatvorlage
 * @see https://de.wiktionary.org/wiki/Vorlage:Formatvorlage_(allgemein)
 *
 * @privateRemarks
 * TODO: The German mappings are incomplete. The missing sections are as follows:
 * - Lesungen
 * - Alternative Schreibweisen
 * - Nicht mehr gültige Schreibweisen
 *   - Old section: Veraltete Schreibweisen
 * - Worttrennung
 * - in arabischer Schrift
 * - in kyrillischer Schrift
 * - in lateinischer Schrift
 * - Strichreihenfolge
 * - Vokalisierung
 * - Umschrift
 * - Grammatische Merkmale
 * - Abkürzungen
 * - Symbole
 * - Wortfamilie
 * - Weibliche Wortformen
 * - Männliche Wortformen
 * - Verkleinerungsformen
 * - Vergrößerungsformen
 * - Kurzformen
 * - Koseformen
 * - Namensvarianten
 * - Weibliche Namensvarianten
 * - Männliche Namensvarianten
 * - Bekannte Namensträger
 * - Redewendungen
 * - Sprichwörter
 * - Entlehnungen
 * - Lemmaverweis
 * - Ähnlichkeiten 1 / Ähnlichkeiten 2
 *   - Old section: Ähnlichkeiten
 */
export default {
	...getReversed({
		etymology: "Herkunft",
		pronunciation: "Aussprache",
		usageNotes: "Anmerkung",
		synonyms: "Sinnverwandte Wörter",
		antonyms: "Gegenwörter",
		hypernyms: "Oberbegriffe",
		hyponyms: "Unterbegriffe",
		meronyms: "Meronyme",
		holonyms: "Holonyme",
		parasynonyms: "Synonyme",
		derived: "Wortbildungen",
		collocations: "Charakteristische Wortkombinationen", // TODO(vxern): Verify equivalence.
		translations: "Übersetzungen",
		references: "Referenzen und weiterführende Informationen", // TODO(vxern): This one section in German is two in English.
		definitions: "Bedeutungen",
		examples: "Beispiele",
	} satisfies Partial<Record<SectionType, string>> as Partial<Record<SectionType, string>>),
	...({
		"Sinnverwandte Zeichen": "synonyms",
		"Sinnverwandte Redewendungen": "synonyms",
	} satisfies Record<string, SectionType> as Record<string, SectionType>),
};
