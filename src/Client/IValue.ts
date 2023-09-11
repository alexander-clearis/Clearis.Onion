//todo: create onion value class.
//type
//id, string, number, date, object
//          Culture:


import {IContextConsumer} from "../components/base/IContextConsumer";

export type BaseType = string | number | Date | bigint

export interface iValue<Type extends BaseType> {
    value: Type | undefined;

    validate(value: Type): Boolean;

    parse(string: string): Type;

    update();
}

export abstract class Value<Type extends BaseType> implements iValue<Type> {
    protected _value: Type | undefined;
    protected handles: ((value: Value<Type>) => void)[] = [];

    get value(): Type {
        return this._value;
    }

    set value(value: Type) {
        if (this._value != value) {
            this._value = value;
            this.update();
        }
    }

    abstract parse(string: string): Type;

    abstract validate(value: Type): Boolean;

    abstract update();

    bind(handle: (value: Value<Type>) => void) {
        this.handles.push(handle);
    }

    remove(handle: (value: Value<Type>) => void) {
        this.handles = this.handles.filter(keep => keep !== handle);
    }
}



