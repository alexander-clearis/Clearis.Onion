import {ObjectID, OnionObject} from "../../OnionObject";
import {Subscribable} from "../subscriber/Subscribable";
import {ISubscribable} from "../subscriber/ISubscribable";
import {IDataSource, isSourceable} from "../Source/IDataSource";


export type ObjectSet = {
    [index: string]: OnionObject
}
export type BaseValueType = string | number | Date | bigint
export type ValueType = BaseValueType | OnionObject | ObjectSet;

export interface iValue<Type extends ValueType = ValueType> extends ISubscribable<Type> {
    value: Type | undefined;
}

export abstract class AbstractValue<Type extends ValueType = ValueType> extends Subscribable<Type> implements iValue<Type> {
    private _value: Type

    set value(value: Type) {
        if (this._value != value) {
            this._value = value;
            this.callSubscribers(value)
        }
    }

    get value(): Type {
        return this._value
    }
}
