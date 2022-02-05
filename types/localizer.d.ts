export = Localizer;
declare class Localizer {
    /**
     * Translation tool for Artibot
     * @author GoudronViande24
     * @since 1.0.0
     * @param {LocalizerConfig} config - The configuration for this localizer
     */
    constructor(config: LocalizerConfig);
    /**
     * Update this localizer's configuration
     * @param {LocalizerConfig} config - Configuration for the localizer
     */
    updateConfig(config: LocalizerConfig): void;
    /**
     * Update this localizer's lang without changing the entire config
     * @param {string} [lang] - The language code to use (ex.: "EN")
     * @return {string} - The new locale code
     */
    setLocale(lang?: string): string;
    lang: string;
    /**
     * Translate a string
     * @param {string} string - The string to translate
     * @param {string} [lang] - The lang to translate this string into
     * @returns {string} The translated string
     */
    translate(string: string, lang?: string): string;
    /**
     * Translate a string and replace the placeholders with specified values
     * @param {string} string - The string to translate
     * @param {Object} settings - Parameters for the translation
     * @param {string} [settings.lang] - The lang to translate this string into
     * @param {string[]} settings.placeholders - List of the placeholders values to insert into the translated string
     * @returns {string}
     */
    translateWithPlaceholders(string: string, { lang, placeholders }: {
        lang?: string;
        placeholders: string[];
    }): string;
    _: (string: string, lang?: string) => string;
    __: (string: string, { lang, placeholders }: {
        lang?: string;
        placeholders: string[];
    }) => string;
    /**
     * Update the translation file
     * @param {string} [filePath] - The path to the translation file
     */
    updateTranslationsFile(filePath?: string): void;
    filePath: string;
    /** @type {Object} */
    file: any;
}
declare namespace Localizer {
    export { LocalizerConfig };
}
/**
 * - Configuration for the localizer
 */
type LocalizerConfig = {
    /**
     * - Path to file with the translations
     */
    filePath: string;
    /**
     * - Language code to use (ex.: "EN" for english)
     */
    lang?: string;
};
