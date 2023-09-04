import {OnionData} from "./OnionData";
import {OnionView} from "./OnionView";

export namespace OnionProtoClient {
    export const host: string = location.host;
    export const data: OnionData = new OnionData();

    export const view: OnionView = new OnionView()

    //todo: merge single page router

}


