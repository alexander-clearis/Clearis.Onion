import {Context} from "./Context";
import {OnionObject} from "../../data/object/OnionObject";
import {CommunicationProtocol, MockConnector} from "../data/CommunicationProtocol";
import {iValue} from "../../data/values/IValue";
import {PropertyValueType, ValueSet, GlobalValueType} from "../../data/values/GlobalValueType";

export class DataContext extends Context<OnionObject> {
    get(id: string): iValue | undefined {
        return this.value?.get(id);
    }
}

export class ListContext<Type extends PropertyValueType = PropertyValueType> extends Context<ValueSet<Type>> {
    get(id: string): iValue<Type> | undefined {
        if (this.value?.hasOwnProperty(id)) {
            return this.value[id]
        }
        //todo: implement custom path error
        throw new ReferenceError(`ListContext doesn't have a value named: '${id}'`)
    }
}

