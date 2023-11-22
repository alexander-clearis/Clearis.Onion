import {BaseValueType, GlobalValueType, ValueSet} from "../../values/GlobalValueType";
import {ValueUtils} from "../../values/ValueUtils";

export namespace  ValueBindingPropSpaces {

    const _r = null;

    import CaseTransformMethod = ValueUtils._String.CaseTransformMethod;
    import RegexReplaceType = ValueUtils._String.RegexReplaceType;


    export type ValueScaleType = {};
    export type ValueFormatType = {};



    export interface BaseDisplayValueProperties {
        format?: ValueFormatType
    }


    export interface BaseInputValueProperties<Type extends GlobalValueType = GlobalValueType>  {
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

    export interface ListDisplayValueProperties extends BaseDisplayValueProperties {

    }
    export interface ListInputValueProperties extends ListDisplayValueProperties, BaseInputValueProperties<ValueSet> {
        minValue: number
        maxValue: number
    }
}