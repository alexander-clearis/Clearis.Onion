import {Context} from "./Context";
import {OnionObject} from "../../data/object/OnionObject";
import {Communication, MockConnector} from "../DataExchange";
import {iValue} from "../../data/values/IValue";
import {PropertyValueType, ValueSet, GlobalValueType} from "../../data/values/GlobalValueType";

export class DataContext extends Context<OnionObject> {
    get(id: string): iValue<GlobalValueType> | undefined {
        return this.value.get(id);
    }
}

export class ListContext<Type extends PropertyValueType = PropertyValueType> extends Context<ValueSet<Type>> {
    get(id: string): iValue<Type> | undefined {
        if (this.value.hasOwnProperty(id)) {
            return this.value[id]
        }
        throw new ReferenceError(`ListContext doesn't have a value named: '${id}'`)
    }
}

export class S_MockContext extends Context<OnionObject> {

    constructor(communication: MockConnector, private id: string) {
        super(communication);

        this.refresh()
    }

    get(id: string): iValue<GlobalValueType> | undefined {
        return this.value?.get(id);
    }

    refresh() {
        this.communication.send<OnionObject>(this.id).then(recieved => {
            this.set(recieved)
        })

    }
}

export class L_MockContext<Type extends PropertyValueType = PropertyValueType> extends ListContext<Type> {

    constructor(communication: MockConnector, private ids: string[]) {
        super(communication);

        this.refresh()
    }

    refresh() {
        this.communication.send<ValueSet<Type>>(this.ids).then(recieved => {
            this.set(recieved)
        })
    }
}
