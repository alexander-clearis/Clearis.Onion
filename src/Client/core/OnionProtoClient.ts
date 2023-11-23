import {Data} from "./Data";
import {View} from "./View";
import {Culture} from "./Culture";


export namespace OnionProtoClient {
    export const host: string = location.host;
    export const data: Data = new Data();
    export const view: View = new View()

    export const culture: Culture = new Culture()

}

