import {Subscribable} from "../../data/binding/private/Subscribable";
import {IDataSource} from "../IDataSource";
import {AbstractValue, iValue} from "../../data/values/IValue";
import {Communication} from "../DataExchange";
import {GlobalValueType} from "../../data/values/GlobalValueType";

export abstract class Context<Type extends GlobalValueType = GlobalValueType> extends Subscribable<Type> implements IDataSource, iValue<Type> {
    readonly discriminator = "IS_SOURCE";
    protected readonly communication: Communication;
    value: Type | undefined;

    constructor(communication: Communication) {
        super();
        this.communication = communication
    }

    abstract get(id?: string): iValue | undefined


    refresh() {
        this.communication.send<Type>({}).then(recieved => this.set(recieved))
    }

    //todo: must be protected
    set(value: Type, forceUpdate?: boolean) {

        this.value = value;
        this.callSubscribers(value)
        //todo: check if forceUpdate boolean is mandatory?
        // if (forceUpdate) {
        //     this.value = value;
        //     this.callSubscribers(value)
        // } else if (this.value != value) {
        //     this.value = value
        //     this.callSubscribers(value)
        // }
    }
}

