import {Culture} from "../../core/Culture";
import {OnionProtoClient} from "../../core/OnionProtoClient";

export namespace ValueUtils {

    export namespace Validation {
        export type GlobalValidationStateType = GeneralValidationState | StringValidationState | NumberValidationState

        export enum GeneralValidationState {IS_REQUIRED}

        export enum StringValidationState {REGEX, MIN_VALUE, MAX_VALUE }

        export enum NumberValidationState {MIN_VALUE, MAX_VALUE, NaN}

        export class ValidationError extends Error {

            constructor(state: GlobalValidationStateType, message: string) {
                super(message);

            }
        }
    }


    export namespace _String {

        export enum CaseTransformMethod {UPPERCASE = "Uppercase", LOWERCASE = "Lowercase", CAPITALIZE = "Capitalize"}

        //todo: write doc
        ///Uppercase, Zet alle tekst om in hoofdletters
        // Lowercase, zet alle tekst om in kleine letters
        // Capitalize, zet alle eerste letters van woorden om in hoofdletters. Voorbeeld: dit is een zin, wordt dan: Dit Is Een Zin.

        export function applyCaseTransform(value: string, method: CaseTransformMethod): string {
            if (String_isNullOrEmpty(value) || method == undefined) {
                return value;
            }

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

        export function matchesRegex(value: string, regex: RegexType): boolean {
            if (regex == undefined) {
                return true;
            }
            if (String_isNullOrEmpty(value)) {
                return false;
            }

            if (typeof regex == "string") {
                return new RegExp(regex).test(value);
            } else {
                return regex.test(value);
            }
        }


        export type RegexReplaceType = [searchValue: RegexType, replaceValue: string];

        export function applyRegexReplace(value: string, method: RegexReplaceType): string {
            if (String_isNullOrEmpty(value) || method == undefined) {
                return value;
            }

            //todo: write doc
            return value.replaceAll(method[0], method[1]);
        }

        //todo: check is null
        //todo: write Unit Test
        //todo: write doc
        //true:     "dit is een valid string"
        //false:    undefined
        //          null
        //          "  ", and all other 'whitespaces'
        export function String_isSet(value: string | null | undefined): value is string {
            return typeof value === "string" && value.trim().length > 0;
        }
        //true:     undefined
        //          null
        //          "  ", and all other 'whitespaces'
        //false:    "dit is een valid string"
        export function String_isNullOrEmpty(value: string | null | undefined): boolean {
            //todo: implementStringIsEMPTY!!
            return !String_isSet(value)
        }
    }

    export namespace _Number {

        export function Number_isSet(value: number | null | undefined): value is number {
            return typeof value === "number"
        }
        export function Number_isNaN(value: number | undefined): boolean {
            return Number.isNaN(value)
        }

        export function Number_isNullOrEmpty(value: number | null | undefined): value is undefined {
            return !Number_isSet(value);
        }



        export function maxValueOfResolve<T>(array: T[], resolve: (value: T) => number): T {
            return array.reduce(function (prev, current) {
                return (prev && resolve(prev) > resolve(current)) ? prev : current
            })
        }

        export function minValueOfResolve<T>(array: T[], resolve: (value: T) => number): T {
            return array.reduce(function (prev, current) {
                return (prev && resolve(prev) < resolve(current)) ? prev : current
            })
        }



    }
}