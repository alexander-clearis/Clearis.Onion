import {iValue} from "./Data/Value/IValue";
import {IDataSource} from "./Data/Source/IDataSource";

export type ObjectID = string

export interface ObjectFields {
    [index: string]: iValue;
}


export class OnionObject implements IDataSource {
    readonly discriminator: "IS_SOURCE";

    private readonly _ID: ObjectID

    private readonly _field: ObjectFields = {

    };

    get(property_name: string) {
        return this._field.property_name
    }
}
