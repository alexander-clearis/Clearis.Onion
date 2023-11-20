import {ContainerController, ContainerControllerProps} from "../container/ContainerControllerProps";
import {GlobalContextStore} from "../../../core/context/GlobalContextStore";
import {ComponentChild, h} from "preact";
import {OnionProtoClient} from "../../../core/OnionProtoClient";

interface ContentControllerProps extends ContainerControllerProps {
    contextSource: GlobalContextStore
}

export class ContentController {
    private props: ContentControllerProps;
    contextSource: GlobalContextStore;

    constructor(wrapperProps: ContentControllerProps) {
        this.props = wrapperProps;
        this.contextSource = this.props.contextSource;
    }

    getWrapperComponent(): JSX.Element {
        return <ContentWrapperComponent {...this.props} contentDidMount={this.contentDidMount}/>
    }

    contentDidMount = () => {
        console.log("Content mounted!")
        this.contextSource.refresh(this)
    }

}

export interface ContentWrapperHooks {
    contentDidMount: () => void;
}

export class ContentWrapperComponent extends ContainerController<ContentControllerProps & ContentWrapperHooks> {
    constructor(props: ContentControllerProps & ContentWrapperHooks) {
        super(props);
    }

    render(): ComponentChild {
        return OnionProtoClient.view.createControllers(this.props.content, this.props.contextSource);
    }

    componentDidMount() {
        this.props.contentDidMount()
    }
}