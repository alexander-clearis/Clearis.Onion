import {IDataSource} from "../IDataSource";
import {Context} from "./Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";
import {ContextProperties} from "../getPage/ContentDefinition";
import {DataContext, ListContext} from "./DataContext";
import {QueryProtocol} from "../data/QueryProtocol";
import {CommunicationProtocol} from "../data/CommunicationProtocol";

type ContextStore = { [index: string]: Context<any> }

export class GlobalContext implements IDataSource {
    readonly discriminator = "IS_SOURCE";
    readonly map: ContextStore = {}

    get(contextKey: string): Context | undefined {
        if (this.map.hasOwnProperty(contextKey)) {
            return this.map[contextKey]
        }

        // todo: implement custom error!
        throw new ReferenceError(`The current page context doesn't have a context named: '${contextKey}'`)
    }

    add<Type extends GlobalValueType = GlobalValueType>(key: string, context: Context<Type>): void {
        if (this.map.hasOwnProperty(key)) {
            throw new Error("Context with this key already exists.")
        }
        this.map[key] = context
    }

    create(key: string, contextProperties: ContextProperties): void {
        if (this.map.hasOwnProperty(key)) {
            throw new Error("Context with this key already exists.")
        }

        if (contextProperties.isList) {
            this.map[key] = new ListContext(contextProperties.end_point, QueryProtocol.getProtocol(contextProperties.queryProtocol), CommunicationProtocol.getProtocol(contextProperties.communicationProtocol))
        } else {
            this.map[key] = new DataContext(contextProperties.end_point, QueryProtocol.getProtocol(contextProperties.queryProtocol), CommunicationProtocol.getProtocol(contextProperties.communicationProtocol));
        }


    }


}