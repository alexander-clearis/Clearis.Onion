import {BaseType, iValue} from "./IValue";

export type ObjectID = string

export interface ObjectFields {
    [index: string]: iValue<BaseType>;
}

export class MetaObject {

}


export class OnionObject {
    private readonly _ID: ObjectID
    private readonly _metaObject: MetaObject

    private readonly _field: ObjectFields = {

    };

    get ID(): ObjectID {
        return this._ID;
    }

    get metaObject() {
        return this._metaObject;
    }
}