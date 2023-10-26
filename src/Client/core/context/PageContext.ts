import {IDataSource} from "../IDataSource";
import {Context} from "./Context";

type ContextMap = { [index: string]: Context }

export class PageContext implements IDataSource {
    readonly discriminator = "IS_SOURCE";
    readonly map: ContextMap = {}

    get(contextName: string): Context | undefined {
        if (this.map.hasOwnProperty(contextName)) {
            return this.map[contextName]
        }
        throw new ReferenceError(`The current page context doesn't have a context named: '${contextName}'`)
    }

    add(name: string, context: Context): void {
        //todo: with if context with this name already exitsts
        this.map[name] = context
    }
}
