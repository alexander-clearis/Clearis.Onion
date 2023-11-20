import {IDataSource} from "../IDataSource";
import {Context} from "./Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";
import {ContextMap, ContextProperties} from "../getPage/ContentDefinition";
import {DataContext, ListContext} from "./DataContext";
import { QueryProtocol} from "../data/QueryProtocol";
import {CommunicationProtocol, getCommunicationProtocol} from "../data/CommunicationProtocol";
import * as querystring from "querystring";
import {getProtocol} from "../data/query/PRQL_protocol";

type ContextStore = { [index: string]: Context<any> }

export class GlobalContextStore implements IDataSource {
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
            //todo: write custom error!
            throw new Error("Context with this key already exists.")
        }

        if (contextProperties.isList) {
            this.map[key] = new ListContext(contextProperties.end_point, getProtocol(contextProperties.queryProtocol) as QueryProtocol, getCommunicationProtocol(contextProperties.communicationProtocol))
        } else {
            this.map[key] = new DataContext(contextProperties.end_point, getProtocol(contextProperties.queryProtocol) as QueryProtocol, getCommunicationProtocol(contextProperties.communicationProtocol));
        }
    }
    createMap(contextMap: ContextMap) {
        for(let contextID in contextMap) {
            try {
                this.create(contextID, contextMap[contextID]);
            } catch (e) {
                console.error(e)
            }
        }
    }
    refresh(...params: any) {
        console.log(...params)
        for (let contextID in this.map) {
            this.map[contextID].refresh()
        }
    }
}