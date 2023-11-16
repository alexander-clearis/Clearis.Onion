import {Content, ContainerController} from "../ui/private/container/ContainerControllerProps";
import {IDataSource} from "./IDataSource";
import {OnionProtoClient} from "./OnionProtoClient";
import {ContentDefinition} from "./getPage/ContentDefinition";
import {ContentContext} from "./context/ContentContext";
import {ContentController, ContentWrapperComponent} from "../ui/private/page/ContentWrapperComponent";
import {createElement, h, VNode} from "preact";
import {BaseComponentProps, BasicViewComponent, ComponentFactoryProps} from "../ui/private/base/BasicViewController";
import {ComponentConstructor, entries, SampleProps} from "../ui/public/_public_components";


export class View {

    constructor() {
        this.createViewEventListeners()
    }

    public getContentController(key: string, contentDefinition: ContentDefinition): ContentController {
        const contentContext: ContentContext = new ContentContext();
        console.log("New Content Controller created!")
        // todo: fix ComponentType!
        return new ContentController({
            content: contentDefinition.content,
            componentType: key,
            CHECK_ME: "DIFFERENT CHECK ME VALUE!"
        })
    }

    createControllers(content: Content): VNode[] {
        const result: VNode[] = []
        for (let componentID in content) {
            let componentFactoryProps = content[componentID];
            try {
                result.push(createElement(this.getComponentConstructor(componentFactoryProps.componentType), this.wrapProperties(componentFactoryProps)))
            } catch (e) {
                console.log(e)
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

    private wrapProperties<PropType extends ComponentFactoryProps>(factoryProps: PropType): PropType & BaseComponentProps {
        return {
            ...factoryProps,
            CHECK_ME: "this is fun!"
        }
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
            return this.getContentController("location", contentDefinition)
        })
    }
}
