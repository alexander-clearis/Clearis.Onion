import {OnionObject} from "../data/object/OnionObject";
import {OnionProtoClient} from "./OnionProtoClient";

export abstract class Communication {
    //oke wat dit moet worden, je gooit er een schema of context oid. Aan de hand van schema wordt R ge intepreteerd.
    abstract send<R>(data: any): Promise<R>
}


export class MockConnector {

    send<R = OnionObject>(data: any): Promise<R> {
        return new Promise<R>(resolve => {
                resolve(OnionProtoClient.data.get(data as string) as R);
            }
        )
    }
}