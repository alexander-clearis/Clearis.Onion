import {Context} from "../../Client/Context";
import {IContextConsumer} from "./IContextConsumer";

export interface IContextProvider{
    getContext(): Context;
}