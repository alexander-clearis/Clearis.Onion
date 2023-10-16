import {State} from "./Data/Source/State";
import {View} from "./View";


export namespace OnionProtoClient {
    export const host: string = location.host;
    export const data: State = new State();

    export const view: View = new View()

    //todo: merge single page router

}


