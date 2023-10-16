import {Subscribable} from "../subscriber/Subscribable";
import {IDataSource} from "../Source/IDataSource";
import {AbstractValue, iValue, ValueType} from "../Value/IValue";
import {OnionObject} from "../../OnionObject";

export abstract class Context<Type extends ValueType = ValueType> extends Subscribable<Type> implements IDataSource, iValue<Type>{
    readonly discriminator: "IS_SOURCE";

    abstract get(id?: string): iValue | undefined

    value: Type | undefined;
}

