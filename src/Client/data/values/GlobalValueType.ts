import {OnionObject} from "../object/OnionObject";
import {iValue} from "./IValue";

export type DateTimeType = number
export type ColorType = number
export type UrlType = URL | string

export enum ValueTypeEnum {
    OBJECT = "OBJECT"
}
export type BaseValueType = undefined | string | number | boolean | DateTimeType | ColorType | UrlType

export type PropertyValueType = BaseValueType | OnionObject

export type GlobalValueType = PropertyValueType | ValueSet;

export type ValueSet<Type extends PropertyValueType = PropertyValueType> = Record<string, iValue<Type>>
