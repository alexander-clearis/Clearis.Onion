import {OnionProtoClient} from "./OnionProtoClient";
import {ComponentFactoryProps, Content, ContentDefinition} from "./getPage/ContentDefinition";
import {GlobalContextStore} from "./context/GlobalContextStore";
import {ContentController} from "../ui/private/page/ContentWrapperComponent";
import {createElement, h, VNode} from "preact";
import {BaseComponentProps} from "../ui/private/base/BasicViewController";
import {ComponentConstructor, entries} from "../ui/public/_public_components";
import {CommunicationProtocolEnum} from "./data/CommunicationProtocol";
import {QueryLanguage} from "./data/QueryProtocol";
import {page, page2} from "../../page";
import app from "../../Components/app";
import App from "../../Components/app";
import {iDatasource} from "./IDatasource";


export class View {
    public appLocation: string;
    public app?: App;

    constructor() {
        this.appLocation = window.location.origin
        this.createViewEventListeners()
    }

    public getContentController(key: string, contentDefinition: ContentDefinition): ContentController {
        const contentContext: GlobalContextStore = new GlobalContextStore();
        contentContext.createMap(contentDefinition.context);

        // todo: fix ComponentType!
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

    public getComponentConstructor(ComponentName: string): ComponentConstructor {
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


    private createViewEventListeners() {
        this.bind_captureHyperlinkClicks()
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

                this.app?.setWindowLocation(event.target.href)
                // todo:
                // open the page with url.pathname
                // this.openPage(url.pathname)
            }
        }
    }


    getPage(location: string): Promise<ContentDefinition> {
        if(location == this.appLocation + "/plate") {
            return Promise.resolve(page2)
        } else {
            return Promise.resolve(page)
        }
    }

    getPageController(location: string): Promise<ContentController> {
        console.log(`New Page Controller Requested, to location ${location}`)

        return this.getPage(location).then(contentDefinition => {
            return this.getContentController("location", contentDefinition)
        })
    }

    bindApp(app: App) {
        this.app = app;
        app.setWindowLocation(window.location.href)
    }
}
