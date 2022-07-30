import fs from "fs";

export abstract class LocalizerConfig {
	filePath: string;
	lang?: string;
}

export default class Localizer {
	/**
	 * Translation tool for Artibot
	 * @author GoudronViande24
	 * @since 1.0.0
	 * @param {LocalizerConfig} config - The configuration for this localizer
	 */
	constructor(config: LocalizerConfig) {
		this.updateConfig(config);
	}

	lang: string;
	file: {
		default: string;
		strings: {
			[x: string]: {
				[x: string]: string;
			};
		};
	};
	filePath: string;

	/**
	 * Update this localizer's configuration
	 * @param {LocalizerConfig} config - Configuration for the localizer
	 * @throws {Error}
	 */
	updateConfig(config: LocalizerConfig): void {
		if (!config.filePath || typeof config.filePath != "string") throw new Error("'file' parameter must be a non-empty string");
		this.updateTranslationsFile(config.filePath);
		this.setLocale(config.lang);
	}

	/**
	 * Update this localizer's lang without changing the entire config
	 * @param {String} [lang] - The language code to use (ex.: "EN")
	 * @returns {String} - The new locale code
	 */
	setLocale(lang: string = this.file.default.toLowerCase()): string {
		this.lang = lang;
		return this.lang;
	}

	/**
	 * Translate a string
	 * @param {String} string - The string to translate
	 * @param {String} [lang] - The lang to translate this string into
	 * @returns {String} The translated string
	 * @throws {Error}
	 */
	translate(string: string, lang: string = this.lang): string {
		if (!string || typeof string != "string") throw new Error("'string' parameter must be a non-empty string");
		lang = lang.toLowerCase();

		if (lang == this.file.default) return string;

		try {
			var translated = this.file.strings[string][lang];
		} catch {
			throw new Error("Localizer: An error occured when trying to translate this string. Maybe it just does not exist in the file or you made an error in it.")
		};

		if (translated) return translated;
		return string
	}

	/**
	 * Translate a string and replace the placeholders with specified values
	 * @param {String} string - The string to translate
	 * @param {Object} settings - Parameters for the translation
	 * @param {String} [settings.lang] - The lang to translate this string into
	 * @param {String[]} settings.placeholders - List of the placeholders values to insert into the translated string
	 * @returns {String}
	 */
	translateWithPlaceholders(string: string, settings: { lang?: string, placeholders: string[] }): string {
		const { lang, placeholders } = settings;
		let translated = this.translate(string, lang);
		placeholders.forEach((placeholder, i) => translated = translated.replaceAll(`[[${i}]]`, placeholder));
		return translated;
	}

	_ = this.translate;

	__ = this.translateWithPlaceholders;

	/**
	 * Update the translation file
	 * @param {String} [filePath] - The path to the translation file
	 */
	updateTranslationsFile(filePath: string = this.filePath): void {
		this.filePath = filePath;
		this.file = JSON.parse(fs.readFileSync(filePath).toString());
	}
}