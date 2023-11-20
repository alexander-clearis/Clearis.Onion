import {Content} from "../../ui/private/container/ContainerControllerProps";
import {QueryLanguage} from "../data/QueryProtocol";
import {CommunicationProtocolEnum} from "../data/CommunicationProtocol";

/**
 * @interface ContentDefinition - Represents the content, and context of a page or container.
 */
export interface ContentDefinition {
    /**
     * Describes a list of components, that should be rendered.
     */
    content: Content;
    /**
     Represents the context, that should be accesible for the {@link content} *
     */
    context: ContextMap
}

export type ContextMap = {
//todo: write TSDOC
    [index: string]: ContextProperties
}

export interface ContextProperties {
    end_point: string
    isList: boolean;
    queryProtocol: QueryLanguage
    communicationProtocol: CommunicationProtocolEnum
}


