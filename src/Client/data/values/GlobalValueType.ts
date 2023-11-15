import {OnionObject} from "../object/OnionObject";
import {iValue} from "./IValue";
import {ValueProperties} from "../binding/public/ValueBindingProps";

export type DateTimeType = number
export type ColorType = number
export type UrlType = URL | string

export enum ValueTypeEnum {
    OBJECT = "OBJECT"
}
export type BaseValueType = undefined | string | number | boolean | DateTimeType | ColorType | UrlType

export type PropertyValueType = BaseValueType | OnionObject

export type GlobalValueType = PropertyValueType | ValueSet;

export type ValueSet<Type extends GlobalValueType = PropertyValueType> = {
    [index: string]: iValue<Type>
}
