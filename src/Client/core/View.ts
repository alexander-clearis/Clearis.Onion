import {BaseComponentProps, ViewController} from "../ui/private/base/ViewController";
import {entries, ViewControllerCTOR} from "../ui/public/_public_components";
import {PageController} from "../ui/private/page/PageController";

import {PageContext} from "./context/PageContext";
import {Content} from "../ui/private/container/ContainerController";
import {IDataSource} from "./IDataSource";
import {OnionProtoClient} from "./OnionProtoClient";
import {ContentDefinition} from "./getPage/ContentDefinition";


export class View {
    constructor() {
        this.createViewEventListeners()
    }

    public createPage(content: Content, pageContext?: PageContext): PageController {
        if (!pageContext) {
            pageContext = new PageContext()
        }
        return new PageController(
            pageContext, {
                componentType: "",
                content: content
            })
    }

    public createContentController(contentDefinition: ContentDefinition) {
        
    }
    createControllers(dataSource: IDataSource, content: Content): ViewController[] {
        return Object.keys(content).map(component => {
                let entry = entries[content[component].componentType];
                return new entry(dataSource, content[component])
            }
        )
    }


    private createViewEventListeners() {

    }






    //todo: finish SPA
    //todo: test hyperlink clicks
    private bind_captureHyperlinkClicks() {
        window.addEventListener('click', event => {
            this.doRoutingOnClick(event);
        })
    }


    //todo: write doc, about SPA
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

                //todo:
                // open the page with url.pathname
                // this.openPage(url.pathname)
            }
        }
    }
}
