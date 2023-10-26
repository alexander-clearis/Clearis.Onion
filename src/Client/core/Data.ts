import {MockObject, ObjectID, OnionObject} from "../data/object/OnionObject";

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
            throw new ReferenceError(`Object with ID: ${id} not found.`)
        }
        return objectFromStore;
    }

    constructor() {
        // let owner1 = new MockObject("AAA", {
        //     name: new PropertyValue("Bert")
        // })
        //
        // let owner2 = new MockObject("BBB", {
        //     name: new PropertyValue("Ernie")
        // })
        // let car1 = new MockObject("111222333", {
        //     brand: new PropertyValue("Opel"),
        //     plate: new PropertyValue("05-TL-TF"),
        //     owner: new PropertyValue(owner1),
        // })
        // let car2 = new MockObject("999000999", {
        //     brand: new PropertyValue("Mercedes"),
        //     plate: new PropertyValue("01-AA-AA"),
        //     owner: new PropertyValue(owner2),
        // })
        //
        // let garage = new MockObject("123456789", {
        //     name: new PropertyValue("De Autohandel"),
        //     address: new PropertyValue("Keizersgracht 123 1015 CW Amsterdam"),
        //     currentCar: new PropertyValue(car1)
        // })

        // this._store.set(garage.id, garage);
        // this._store.set(car1.id, car1);
        // this._store.set(car2.id, car2);
        // this._store.set(owner1.id,owner1);
        // this._store.set(owner2.id,owner2);
    }

    getGarage() {
        return this.get("123456789")
    }
    getOpel() {
        return this.get("111222333")
    }
    getMercedes() {
        return this.get("999000999")
    }
    switchCar() {
        let garage = this.getGarage();
        if(garage.get("currentCar").value == this.getMercedes()) {
            garage.get("currentCar").value = this.
            getOpel();
        }else {
            garage.get("currentCar").value = this.getMercedes();
        }
    }
}