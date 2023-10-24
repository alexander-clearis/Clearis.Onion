import {OnewWay_ValueBinding} from "./OnewWay_ValueBinding";
import {ValueType} from "../values/IValue";


export class TwoWay_ValueBinding<Type extends ValueType = ValueType> extends OnewWay_ValueBinding<Type> {


    //todo: check for endpoint value setter...
    set(value: Type): void {
        if (this.endPoint) {
            this.endPoint.value = value;
        }
    }
}