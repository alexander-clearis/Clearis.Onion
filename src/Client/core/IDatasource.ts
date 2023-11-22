import {iValue} from "../data/values/IValue";
import {GlobalValueType} from "../data/values/GlobalValueType";

const DataSourceDiscriminator = "IS_SOURCE"

export function isSourceable(object: any): object is iDatasource {
    return (object.discriminator === DataSourceDiscriminator);
}


export interface iDatasource<Type extends GlobalValueType = GlobalValueType> {
    readonly discriminator: "IS_SOURCE"

    get(id?: string): iValue<Type> | undefined
}

