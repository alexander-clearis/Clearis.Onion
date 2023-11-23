import {OnionProtoClient} from "./OnionProtoClient";
import {ComponentFactoryProps, Content, ContentDefinition} from "./getPage/ContentDefinition";
import {GlobalContextStore} from "./context/GlobalContextStore";
import {ContentController} from "../ui/private/page/ContentWrapperComponent";
import {createElement, h, VNode} from "preact";
import {BaseComponentProps} from "../ui/private/base/BasicViewController";
import {ComponentConstructor, entries} from "../ui/public/_public_components";
import {CommunicationProtocolEnum} from "./data/CommunicationProtocol";
import {QueryLanguage} from "./data/QueryProtocol";

import {iDatasource} from "./IDatasource";
import Page from "../../Components/Page";


export class View {
    private _page?: Page | null;
    get page(): Page | null{
        return this.page;
    }
    constructor() {

    }

    bindPage(page: Page): void {
        this._page = page;
    }

    public createContentController(contentDefinition: ContentDefinition): ContentController {
        const contentContext: GlobalContextStore = new GlobalContextStore();
        contentContext.createMap(contentDefinition.context);

        return new ContentController({
            content: contentDefinition.content,
            componentType: "ContentController",
            contextSource: contentContext,
            bindings: {}
        })
    }
    createComponents(content: Content, context: iDatasource): VNode[] {
        const result: VNode[] = []
        for (let componentID in content) {
            let componentFactoryProps = content[componentID];
            try {
                result.push(createElement(this.getComponentConstructor(componentFactoryProps.componentType), this.wrapProperties(componentFactoryProps, context)))
            } catch (e) {
                console.error(e)
            }
        }
        return result;
    }
    private getComponentConstructor(ComponentName: string): ComponentConstructor {
        if (entries.hasOwnProperty(ComponentName)) {
            return entries[ComponentName]
        } else {
            throw new Error(`No constructor found for: ${ComponentName}  in constructor entries.`)
        }
    }
    private wrapProperties<PropType extends ComponentFactoryProps>(componentFactoryProps: PropType, context: iDatasource): PropType & BaseComponentProps {
        return {
            ...componentFactoryProps,
            contextSource: context
        }
    }
}
