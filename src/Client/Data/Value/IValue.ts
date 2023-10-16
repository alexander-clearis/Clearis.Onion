import {ObjectID, OnionObject} from "../../OnionObject";
import {Subscribable} from "../subscriber/Subscribable";
import {ISubscribable} from "../subscriber/ISubscribable";
import {IDataSource, isSourceable} from "../Source/IDataSource";

export type ValueSet<Type extends ValueType = BaseValueType> = {
    [index: string]: iValue<Type>

}
export type BaseValueType = string | number | Date | bigint | OnionObject
export type ValueType = BaseValueType | ValueSet;

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


export class ValueList<Type extends BaseValueType = BaseValueType> extends AbstractValue<ValueSet<Type>> implements IDataSource<Type> {
    readonly discriminator: "IS_SOURCE";

    get(id?: string): iValue<Type> | undefined {
        return this.value[id];
    }
}
