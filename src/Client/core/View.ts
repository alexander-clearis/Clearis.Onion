import {BaseComponentProps, BasicViewController} from "../ui/private/base/BasicViewController";
import {entries, ViewControllerCTOR} from "../ui/public/_public_components";

import {Content, ContainerController} from "../ui/private/container/ContainerControllerProps";
import {IDataSource} from "./IDataSource";
import {OnionProtoClient} from "./OnionProtoClient";
import {ContentDefinition} from "./getPage/ContentDefinition";
import {ContentContext} from "./context/ContentContext";
import {ContentController} from "../ui/private/page/ContentController";


export class View {

    constructor() {
        this.createViewEventListeners()
    }

    public createContentController(key: string, contentDefinition: ContentDefinition): ContentController {
        const contentContext: ContentContext = new ContentContext();
        console.log("New Content Controller created!")
        // todo: fix ComponentType!
        return new ContentController(contentContext, {
            componentType: key,
            content: contentDefinition.content
        });

    }

    createControllers(dataSource: IDataSource, content: Content): BasicViewController[] {
        return Object.keys(content).map(component => {
                let entry = entries[content[component].componentType];
                return new entry(dataSource, content[component])
            }
        )
    }


    private createViewEventListeners() {

    }

    // todo: finish SPA
    // todo: test hyperlink clicks
    private bind_captureHyperlinkClicks() {
        window.addEventListener('click', event => {
            this.doRoutingOnClick(event);
        })
    }


    // todo: write doc, about SPA
    private doRoutingOnClick(event: MouseEvent) {
        type HTMLHyperlinkElement = HTMLAnchorElement | HTMLAreaElement | HTMLBaseElement | HTMLLinkElement

        function onClickTargetsHyperlink(elem: EventTarget): elem is HTMLHyperlinkElement {
            return elem instanceof HTMLAnchorElement || elem instanceof HTMLLinkElement || elem instanceof HTMLAreaElement || elem instanceof HTMLBaseElement
        }

        function onClickTargetsNewTab(event: MouseEvent): boolean {
            return (event.ctrlKey)
        }

        function onClickTargetsInsideDomain(url: URL): boolean {
            return (url.host === OnionProtoClient.host)
        }

        function cancelClick(event: MouseEvent): void {
            event.preventDefault()
            event.stopPropagation()
            event.stopImmediatePropagation()
        }


        if (event.target
            && onClickTargetsHyperlink(event.target)
            && event.target.href
            && !onClickTargetsNewTab(event)) {

            const url = new URL(event.target.href)

            if (onClickTargetsInsideDomain(url)) {
                cancelClick(event)

                throw new Error("this doRoutingOnClick has not been implemented!")

                // todo:
                // open the page with url.pathname
                // this.openPage(url.pathname)
            }
        }
    }


    getPage(location: string): Promise<ContentDefinition> {
        console.log(`Get Page Request executed for: ${location}`)
        return Promise.resolve({
            content: {},
            context: undefined
        })
    }

    getPageController(location: string): Promise<ContentController> {
        console.log(`New Page Controller Requested, to location ${location}`)

        return this.getPage(location).then(contentDefinition => {
            return this.createContentController("location", contentDefinition)
        })
    }
}
