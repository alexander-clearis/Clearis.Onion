import {OnionContext} from "../../Client/OnionContext";
import {IContextConsumer} from "./IContextConsumer";

export interface IContextProvider{
    getContext(): OnionContext;
    addConsumer(consumer: IContextConsumer): void;
}