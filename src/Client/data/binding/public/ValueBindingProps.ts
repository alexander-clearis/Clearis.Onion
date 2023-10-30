import {BaseValueType} from "../../values/GlobalValueType";
import {ValueUtils} from "../../values/ValueUtils";

export namespace ValueProperties {
    export type ValueScaleType = {}
    export type ValueFormatType = {}

    export interface BaseDisplayValueProperties {
        format?: ValueFormatType
    }

    export interface BaseInputValueProperties<Type extends BaseValueType = BaseValueType> extends BaseDisplayValueProperties {
        defaultValue?: Type
        required: boolean
    }

    export namespace String {
        import RegexType = ValueUtils.String.RegexType;
        import ValuePropertyRegexReplace = ValueUtils.String.RegexReplaceType;
        import CaseTransformMethod = ValueUtils.String.CaseTransformMethod;

        export interface DisplayValueProperties extends BaseDisplayValueProperties {
        }

        export interface InputValueProperties extends DisplayValueProperties, BaseInputValueProperties<string> {
            minValue?: number
            maxValue?: number
            useCaseTransform?: CaseTransformMethod
            regex?: RegexType
            regexReplace?: ValuePropertyRegexReplace
        }
    }

    export namespace Number {
        export interface DisplayValueProperties extends BaseDisplayValueProperties  {
            scale?: ValueScaleType;
        }

        export interface InputValueProperties extends DisplayValueProperties, BaseInputValueProperties<number> {
            minValue: number
            maxValue: number
        }
    }

    export namespace Boolean {
        export interface DisplayValueProperties extends BaseDisplayValueProperties{
            format?: ValueFormatType
        }

        export interface InputValueProperties extends DisplayValueProperties, BaseInputValueProperties<boolean> {

        }
    }

}