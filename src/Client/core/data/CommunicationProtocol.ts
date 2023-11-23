import {Context} from "../context/Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";
import {MockObject, OnionObject} from "../../data/object/OnionObject";
import {PropertyValue} from "../../data/values/IValue";
import {OnionProtoClient} from "../OnionProtoClient";


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
                OnionProtoClient.data.get("6413886411") as R
            )
        } else if (context.endpoint == "/cars"){
            return Promise.resolve(
                OnionProtoClient.data.get("537411687")?.get("cars").value as R
            )
        }

        throw new Error(`This endpoint has not been implemented ${context.endpoint}`)


    }

}