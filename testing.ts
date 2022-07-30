import Localizer from "./src";

const localizer: Localizer = new Localizer({
	filePath: "testing.json"
});

localizer.setLocale("fr");

console.log(localizer._("testing message"));
console.log(localizer.__("testing message with placeholder: [[0]]", { placeholders: ["yes"] }));