import {Context} from "./Context";
import {OnionObject} from "../object/OnionObject";
import {iValue, ValueType} from "../values/IValue";
import {Communication, MockConnector} from "../dataExchange/DataExchange";

export class DataContext extends Context<OnionObject> {
    get(id: string): iValue<ValueType> | undefined {
        return this.value.get(id);
    }
}


export class MockContext extends Context<OnionObject> {

    constructor(communication: MockConnector) {
        super(communication);

        this.refresh()
    }

    get(id: string): iValue<ValueType> | undefined {
        return this.value?.get(id);
    }
    refresh() {
        this.communication.send<OnionObject>("123456789").then(recieved => {
            this.set(recieved)
        })

    }
}
