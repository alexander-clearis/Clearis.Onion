import {IDataSource} from "../IDataSource";
import {Context} from "./Context";
import {GlobalValueType} from "../../data/values/GlobalValueType";

type ContextMap = { [index: string]: Context<any> }


export class PageContext implements IDataSource {
    readonly discriminator = "IS_SOURCE";
    readonly map: ContextMap = {}

    get(contextName: string): Context | undefined {
        if (this.map.hasOwnProperty(contextName)) {
            return this.map[contextName]
        }
        throw new ReferenceError(`The current page context doesn't have a context named: '${contextName}'`)
    }

    add<Type extends GlobalValueType = GlobalValueType>(name: string, context: Context<Type>): void {
        //todo: with if context with this name already exitsts
        this.map[name] = context
    }
}
