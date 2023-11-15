import {Content} from "../../ui/private/container/ContainerController";
import {ValueTypeEnum} from "../../data/values/GlobalValueType";
import {QueryLanguage} from "../data/QueryProtocol";
import {CommunicationProtocolEnum} from "../data/CommunicationProtocol";

/**
 * @interface ContentDefinition - Represents the content, and context of a page or container.
 */
export interface ContentDefinition {
    /**
     * Describes a list of components, that should be rendered.
     */
    content?: Content;
    /**
     Represents the context, that should be accesible for the {@link content} *
     */
    context?: undefined
}

export interface ContextProperties {
    end_point: string
    isList: boolean;
    queryProtocol: QueryLanguage
    communicationProtocol: CommunicationProtocolEnum
}


