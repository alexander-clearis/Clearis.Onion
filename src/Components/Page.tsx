import {Component, ComponentChild, h, RenderableProps} from "preact";
import {ContentDefinition} from "../Client/core/getPage/ContentDefinition";
import {page, page2} from "../page";
import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {ContentController} from "../Client/ui/private/page/ContentWrapperComponent";


export default class Page extends Component<{}, {}> {
    private readonly pageOrigin: string = window.location.origin;
    private _contentController: ContentController | null = null;

    get contentController(): ContentController | null {
        return this._contentController;
    }

    render(props?: RenderableProps<{}>, state?: Readonly<{}>, context?: any): ComponentChild {
        return <div>
            <ul>
                <li>
                    <a href={"/"}> indexasdfasdf </a>
                </li>
                <li>
                    <a href={"/plate"}> /plate </a>
                </li>
            </ul>
            {
                this.contentController?.renderContentSafe()
            }
        </div>;
    }

    componentDidMount() {
        this.createViewEventListeners();
        OnionProtoClient.view.bindPage(this);
        this.openPage(window.location.href);
    }

    componentWillUnmount() {
        //todo: unsubscribe!
    }

    private getPage(location: string): Promise<ContentDefinition> {
        if (location == this.pageOrigin + "/plate") {
            return Promise.resolve(page2)
        } else {
            return Promise.resolve(page)
        }
    }

    public openPage(url: string, pushState: boolean = true) {
        //todo: look into state paramter, of pushState
        if (pushState) window.history.pushState({}, "", url)

        this.getPage(url).then(contentDefinition => {
            try {
                this._contentController = OnionProtoClient.view.createContentController(contentDefinition);
            } catch (e) {
                console.error(e)
            } finally {
                this.forceUpdate()
            }
        })

    }

    private createViewEventListeners() {
        this.bind_captureHyperlinkClicks()
        this.bind_historyPopState();

    }

    private bind_captureHyperlinkClicks() {
        window.addEventListener('click', event => {
            this.doRoutingOnClick(event);
        })
    }

    private bind_historyPopState() {
        window.addEventListener('popstate', event => {
            this.doRoutingOnPopState(event);
        })
    }

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
                this.openPage(event.target.href);
            }
        }
    }

    private doRoutingOnPopState(event: PopStateEvent) {
        this.openPage(window.location.href, false)
    }



}