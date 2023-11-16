import {ContainerController, ContainerControllerProps} from "../container/ContainerControllerProps";
import {ContentContext} from "../../../core/context/ContentContext";
import {ComponentChild, h} from "preact";
import {OnionProtoClient} from "../../../core/OnionProtoClient";

interface ContentControllerProps extends ContainerControllerProps{
}

export class ContentController {
    wrapperProps: ContentControllerProps;
    constructor(wrapperProps: ContentControllerProps) {
        this.wrapperProps = wrapperProps;
    }
    render():JSX.Element {
        return <ContentWrapperComponent {...this.wrapperProps} />
    }
}
export class ContentWrapperComponent extends ContainerController {
    constructor(props: ContentControllerProps) {
        super(props);
    }

    render(): ComponentChild {
        return OnionProtoClient.view.createControllers(this.props.content);
    }


}