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
        return <ContentWrapperComponent key={Math.round(Math.random() * 1000000)} {...this.props} contentDidMount={this.contentDidMount}/>
    }

    contentDidMount = () => {
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

        return OnionProtoClient.view.createComponents(this.props.content, this.props.contextSource)
    }

    componentDidMount() {
        this.props.contentDidMount()
    }

    protected initBindings(): {} {
        return {};
    }
}