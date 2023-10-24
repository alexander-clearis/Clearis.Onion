import {IDataSource} from "../../core/IDataSource";
import {Context} from "./Context";

type ContextMap = { [index: string]: Context }

export class PageContext implements IDataSource {
    readonly discriminator = "IS_SOURCE";
    readonly map: ContextMap = {}

    //todo: implement error on not found
    get(contextName: string): Context | undefined {
        return this.map[contextName]
    }

    add(name: string, context: Context): void {
        this.map[name] = context
    }
}
