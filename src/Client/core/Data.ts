import {MockObject, ObjectID, OnionObject} from "../data/object/OnionObject";
import {PropertyValue} from "../data/values/IValue";

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
        let result;
        if (isSingleObjectID(id)) {
            try {
                result = this.getObjectFromStore(id);
            } catch (e) {
                console.error(e)
            }

        } else {
            result = [];
            id.forEach(id => {
                let objectFromStore;

                try {
                    objectFromStore = this.getObjectFromStore(id);
                } catch (e) {
                    console.error(e)
                }
                if (objectFromStore) {
                    result.push(objectFromStore)
                }
            })
        }
        return result;
    }


    private getObjectFromStore(id: ObjectID): OnionObject {
        let objectFromStore = this._store.get(id);
        if (!objectFromStore) {
            throw new ReferenceError(`Object with ID: ${id} not found.`)
        }
        return objectFromStore;
    }

    constructor() {


        let car1 = new MockObject("6413886411", {
            brand: new PropertyValue("Opel"),
            plate: new PropertyValue("05-TL-TF"),
        })
        let car2 = new MockObject("999000999", {
            brand: new PropertyValue("Mercedes"),
            plate: new PropertyValue("01-AA-AA"),
        })

        let garage = new MockObject("537411687", {
            name: new PropertyValue("De Autohandel"),
            address: new PropertyValue("Keizersgracht 123 1015 CW Amsterdam"),
            cars: new PropertyValue({car: new PropertyValue(car1), car2: new PropertyValue(car2)})
        })

        this._store.set(car1.id, car1);
        this._store.set(car2.id, car2);
        this._store.set(garage.id, garage);
    }
}