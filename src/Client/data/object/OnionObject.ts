import {iValue} from "../values/IValue";
import {iDatasource} from "../../core/IDatasource";

export type ObjectID = string

export type FieldRecordType = Record<string, iValue>


export class OnionObject implements iDatasource {
    readonly discriminator = "IS_SOURCE";

    private readonly _ID: ObjectID

    get id(): ObjectID {
        return this._ID
    }

    protected _field: FieldRecordType = {};

    get(property_name: string): iValue {
        //todo: add loading state to proerties!
        //todo: throw error
        return this._field[property_name]
    }

    constructor(id: ObjectID) {
        this._ID = id;
    }
}


export class MockObject extends OnionObject {
    constructor(id: ObjectID, fields: FieldRecordType) {
        super(id);
        this._field = fields;
    }
}