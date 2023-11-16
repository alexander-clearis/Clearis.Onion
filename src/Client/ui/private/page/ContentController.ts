import {ContainerController, ContainerControllerProps} from "../container/ContainerControllerProps";
import {ContentContext} from "../../../core/context/ContentContext";

interface ContentControllerProps extends ContainerControllerProps{
}

export class ContentController extends ContainerController {
    constructor(context: ContentContext, props: ContentControllerProps) {
        super(context, props);
    }
}