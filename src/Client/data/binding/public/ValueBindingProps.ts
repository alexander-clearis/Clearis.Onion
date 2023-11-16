import {BaseValueType} from "../../values/GlobalValueType";
import {ValueUtils} from "../../values/ValueUtils";

export namespace  ValueBindingPropSpaces {


    import CaseTransformMethod = ValueUtils._String.CaseTransformMethod;
    import RegexReplaceType = ValueUtils._String.RegexReplaceType;

    export interface parent {
        p: string
    }
    export namespace internalSpace {
        export const constant = "this is a constant"
        export interface Bar extends parent{
            hasAprop: string
        }

    }
    export type ValueScaleType = {};
    export type ValueFormatType = {};



    export interface BaseDisplayValueProperties {
        format?: ValueFormatType
    }


    export interface BaseInputValueProperties<Type extends BaseValueType = BaseValueType>  {
        defaultValue?: Type
        required: boolean
        format?: ValueFormatType

    }

    export interface String_DisplayValueProperties extends BaseDisplayValueProperties {

    }
    export interface String_InputValueProperties extends String_DisplayValueProperties, BaseInputValueProperties<string> {
        minValue?: number
        maxValue?: number
        useCaseTransform?: CaseTransformMethod
        regex?: undefined
        regexReplace?: RegexReplaceType
    }



    export interface NumberDisplayValueProperties extends BaseDisplayValueProperties {
        scale?: ValueScaleType;
    }

    export interface NumberInputValueProperties extends NumberDisplayValueProperties, BaseInputValueProperties<number> {
        minValue: number
        maxValue: number
    }


}