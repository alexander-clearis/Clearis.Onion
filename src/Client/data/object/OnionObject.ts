import {iValue} from "../values/IValue";
import {IDataSource} from "../../core/IDataSource";

export type ObjectID = string

export interface ObjectFields {
    [index: string]: iValue;
}


export class OnionObject implements IDataSource {
    readonly discriminator = "IS_SOURCE";

    private readonly _ID: ObjectID

    get id(): ObjectID {
        return this._ID
    }

    protected _field: ObjectFields = {};

    get(property_name: string) {
        return this._field[property_name]
    }

    constructor(id: ObjectID) {
        this._ID = id;
    }
}


export class MockObject extends OnionObject {
    constructor(id: ObjectID, fields: ObjectFields) {
        super(id);
        this._field = fields;
    }
}