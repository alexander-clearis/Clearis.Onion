import {Subscribable} from "../../data/binding/private/Subscribable";
import {IDataSource} from "../IDataSource";
import {AbstractValue, iValue} from "../../data/values/IValue";
import {CommunicationProtocol} from "../data/CommunicationProtocol";
import {GlobalValueType, PropertyValueType} from "../../data/values/GlobalValueType";
import {QueryProtocol} from "../data/QueryProtocol";

export abstract class Context<Type extends GlobalValueType = GlobalValueType> extends Subscribable<Type> implements IDataSource, iValue<Type> {
    readonly discriminator = "IS_SOURCE";

    value: Type | undefined;


    public readonly endpoint: string;
    protected readonly communicationProtocol: CommunicationProtocol;
    protected readonly queryProtocol: QueryProtocol

    constructor(endPoint: string, queryProtocol: QueryProtocol, communicationProtocol: CommunicationProtocol) {
        super();
        this.endpoint = endPoint;
        this.queryProtocol = queryProtocol;
        this.communicationProtocol = communicationProtocol
    }

    abstract get(id?: string): iValue | undefined

    refresh() {
        this.communicationProtocol
            .send<Type>(this)
            .then(response => this.set(response))
    }

    set(value: Type) {
        this.value = value;
        this.callSubscribers(value)
    }
}
