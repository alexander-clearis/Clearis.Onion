import {Subscribable} from "../binding/Subscribable";
import {IDataSource} from "../../core/IDataSource";
import {AbstractValue, iValue, ValueType} from "../values/IValue";
import {Communication} from "../dataExchange/DataExchange";

export abstract class Context<Type extends ValueType = ValueType> extends Subscribable<Type> implements IDataSource, iValue<Type> {
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

