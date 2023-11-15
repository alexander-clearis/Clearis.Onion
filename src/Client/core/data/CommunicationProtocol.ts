import {Context} from "../context/Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";


/**
 * Describes the communication protocol for a context.
 */
export enum CommunicationProtocolEnum {
    REST
}

export abstract class CommunicationProtocol {
    static getProtocol(communicationProtocolEnum: CommunicationProtocolEnum): CommunicationProtocol {
        throw new Error("This method has not been implemented")
    }

    abstract send<R extends GlobalValueType = GlobalValueType>(context: Context<R>): Promise<R>
}

