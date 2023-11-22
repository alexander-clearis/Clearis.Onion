import {Subscribable} from "../binding/private/Subscribable";
import {ISubscribable} from "../binding/private/ISubscribable";
import {GlobalValueType} from "./GlobalValueType";


export interface iValue<Type extends GlobalValueType = GlobalValueType> extends ISubscribable<Type> {
    value?: Type;

}

export  class PropertyValue<Type extends GlobalValueType = GlobalValueType> extends Subscribable<Type> implements iValue<Type> {
    private _value?: Type

    constructor(initial?: Type) {
        super();
        this._value = initial;
    }

    set value(value: Type | undefined) {
        if (this._value != value) {
            this._value = value;
            this.callSubscribers(value)
        }
    }

    get value(): Type | undefined{
        return this._value
    }
}

