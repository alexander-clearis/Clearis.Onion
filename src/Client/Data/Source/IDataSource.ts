import {ValueType, iValue} from "../Value/IValue";
import {OnionObject} from "../../OnionObject";
import {OnionProtoClient} from "../../OnionProtoClient";
import {ISubscribable} from "../subscriber/ISubscribable";

const DataSourceDiscriminator = "IS_SOURCE"

export function isSourceable(object: any): object is IDataSource {
    return ('discriminator' in object && object.discriminator === DataSourceDiscriminator);
}


export interface IDataSource<Type extends ValueType = ValueType> {
    readonly discriminator: "IS_SOURCE"

    get(id?: string): iValue<Type> | undefined
}

