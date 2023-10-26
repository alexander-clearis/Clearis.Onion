export namespace ValueUtils {
    import StringValidationError = ValueUtils.String.StringValidationError;
    type GeneralValidationState = "SUCCESSFUL" | "IS_REQUIRED"
    export type GlobalValidationState = GeneralValidationState | StringValidationError

    export namespace String {
        export type StringValidationError = GeneralValidationState | "MIN_VALUE" | "MAX_VALUE" | "REGEX"

        export type CaseTransformMethod = "Uppercase" | "Lowercase" | "Capitalize";

        //todo: write doc
        ///Uppercase, Zet alle tekst om in hoofdletters
        // Lowercase, zet alle tekst om in kleine letters
        // Capitalize, zet alle eerste letters van woorden om in hoofdletters. Voorbeeld: dit is een zin, wordt dan: Dit Is Een Zin.

        export function applyCaseTransform(value: string, method: CaseTransformMethod): string {
            function _capitalize(sentence: string) {
                return sentence.split(" ").map((word) => {
                    return word[0].toUpperCase() + word.substring(1);
                }).join(" ");
            }

            switch (method) {
                case "Uppercase":
                    return value.toUpperCase();
                case "Lowercase":
                    return value.toLowerCase();
                case "Capitalize":
                    return _capitalize(value);
            }
        }

        export type RegexType = RegExp | string;

        export function matchesRegex(value: string, regex: RegexType): any {
            if (typeof regex == "string") {
                return new RegExp(regex).test(value);
            } else {
                return regex.test(value);
            }
        }


        export type RegexReplaceType = [searchValue: RegexType, replaceValue: string];

        export function applyRegexReplace(value: string, method: RegexReplaceType): string {
            //todo: write doc
            return value.replaceAll(method[0], method[1]);
        }
    }
}