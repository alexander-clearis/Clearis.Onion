export namespace ValueUtils {

    export namespace Validation {
        export type GlobalValidationStateType = GeneralValidationState | StringValidationState

        export enum GeneralValidationState {IS_REQUIRED}

        export enum StringValidationState {REGEX, minValue, maxValue }
    }


    export namespace String {


        export enum CaseTransformMethod {UPPERCASE = "Uppercase", LOWERCASE = "Lowercase", CAPITALIZE = "Capitalize"}

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
                case CaseTransformMethod.UPPERCASE:
                    return value.toUpperCase();
                case CaseTransformMethod.LOWERCASE:
                    return value.toLowerCase();
                case CaseTransformMethod.CAPITALIZE:
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

        //todo: write doc
        //https://www.freecodecamp.org/news/check-if-string-is-empty-or-null-javascript/#:~:text=is%20not%20empty.-,Using%20the%20trim%20Method,-Sometimes%2C%20a%20string
        export function stringIsNotEmpty(value: string | null | undefined): value is string {
            return typeof value === "string" && value.trim().length >= 1;
        }

        export function stringIsEmpty(value: string | null | undefined): boolean {
            //todo: implementStringIsEMPTY!!
            return !stringIsNotEmpty(value)
        }
    }
}