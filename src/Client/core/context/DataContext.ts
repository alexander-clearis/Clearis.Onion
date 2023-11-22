import {Context} from "./Context";
import {OnionObject} from "../../data/object/OnionObject";
import {iValue} from "../../data/values/IValue";
import {PropertyValueType, ValueSet, GlobalValueType} from "../../data/values/GlobalValueType";
import * as http from "http";

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
        throw new ReferenceError(`ListContext doesn't have a value named: '${id}'`)
    }

    //todo: implement thisArg, see forEach
    forEach(callbackfn: (value: iValue<Type>, index: number, set: ValueSet<Type>) => void, thisArg?: any): void {
        let index: number = 0

        for (let key in this.value) {
            callbackfn(this.value[key], index, this.value)
            index++;
        }
    };

    //todo: implement thisArg, see map
    map<ReturnType>(callbackfn: (value: iValue<Type>, index: number, set: ValueSet<Type>) => ReturnType, thisArg?: any): ReturnType[] {
        let result: ReturnType[] = [];
        let index: number = 0

        for (let key in this.value) {
            result.push(callbackfn(this.value[key], index, this.value))
            index++;
        }

        return result;
    };
}
