import {Context} from "../context/Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";
import {MockObject, OnionObject} from "../../data/object/OnionObject";
import {AbstractValue} from "../../data/values/IValue";


/**
 * Describes the communication protocol for a context.
 */
export enum CommunicationProtocolEnum {
    REST
}

export function getCommunicationProtocol(communicationProtocolEnum: CommunicationProtocolEnum): CommunicationProtocol {
    return new MockCommunicationProtocol()
}

export abstract class CommunicationProtocol {


    abstract send<R extends GlobalValueType = GlobalValueType>(context: Context<R>): Promise<R>
}

export class MockCommunicationProtocol extends CommunicationProtocol {
    send<R extends GlobalValueType = GlobalValueType>(context: Context<R>): Promise<R> {


        if(context.endpoint == "/car1") {
            return Promise.resolve(
                new MockObject("8168737873", {
                    name: new AbstractValue<string>("BMW")
                }) as R

            )
        }



        throw new Error(`This endpoint has not been implemented ${context.endpoint}`)


    }

}