import {ObjectID, OnionObject} from "./OnionObject";

type DataResult = {
    objects: { [index: string]: dataObject }
};
type dataObject = {}

function isSingleObjectID(value: ObjectID | ObjectID[]): value is ObjectID {
    return typeof value == "string"
}

export class Data {

    private _store: Map<ObjectID, OnionObject> = new Map();

    get(id: ObjectID[]): OnionObject[] | undefined
    get(id: ObjectID): OnionObject | undefined
    get(id: ObjectID | ObjectID[]): OnionObject | OnionObject[] | undefined {
        let result: OnionObject | OnionObject[] | undefined;
        if (isSingleObjectID(id)) {

            try {
                result = this.getObjectFromStore(id);
            } catch (e) {
                console.error(e)
            }

        } else {
            let resultArray = [];
            id.forEach(id => {
                let objectFromStore;

                try {
                    objectFromStore = this.getObjectFromStore(id);
                } catch (e) {
                    console.error(e)
                }
                if (objectFromStore) {
                    resultArray.push(objectFromStore)
                }
            })
        }
        return result;
    }

    private getObjectFromStore(id: ObjectID): OnionObject {
        let objectFromStore = this._store.get(id);
        if (!objectFromStore) {
            throw new Error(`Object with ID: ${id} not found.`)
        }
        return objectFromStore;
    }


}

