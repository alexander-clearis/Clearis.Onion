import {QueryLanguage} from "../data/QueryProtocol";
import {CommunicationProtocolEnum} from "../data/CommunicationProtocol";
import {BaseComponentProps} from "../../ui/private/base/BasicViewController";
import {BindingRecordBaseType} from "../../data/binding/public/BindingTypings";

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
    context:ContextRecord
}

export type ContextRecord = Record<string, ContextProperties>
export interface ContextProperties {
    end_point: string
    isList: boolean;
    queryProtocol: QueryLanguage
    communicationProtocol: CommunicationProtocolEnum
}


/**
 * Describes a key-value map, of components.
 */
export type Content = Record<string, ContentFactoryRecordType>
export type ContentFactoryRecordType = ComponentFactoryProps

export interface ComponentFactoryProps<K extends BindingRecordBaseType = {}> {
    readonly componentType: string;
    bindings: Record<keyof K, BindingProperties>


}

export interface BindingProperties {
    path: string;
}


export enum BindingTypeEnum {
    String,
    Number
}
