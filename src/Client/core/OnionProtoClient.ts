import {Data} from "./Data";
import {View} from "./View";


export namespace OnionProtoClient {
    export const host: string = location.host;
    export const data: Data = new Data();

    export const view: View = new View()

    //todo: merge single page router

}


