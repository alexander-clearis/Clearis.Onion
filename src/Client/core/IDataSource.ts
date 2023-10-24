import {ValueType, iValue} from "../data/values/IValue";
import {OnionObject} from "../data/object/OnionObject";
import {OnionProtoClient} from "./OnionProtoClient";
import {ISubscribable} from "../data/binding/ISubscribable";

const DataSourceDiscriminator = "IS_SOURCE"

export function isSourceable(object: any): object is IDataSource {
    return (object.discriminator === DataSourceDiscriminator);
}


export interface IDataSource<Type extends ValueType = ValueType> {
    readonly discriminator: "IS_SOURCE"

    get(id?: string): iValue<Type> | undefined
}

