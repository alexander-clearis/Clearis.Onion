import {BaseComponentProps, BasicViewComponent, ComponentFactoryProps} from "../base/BasicViewController";

/**
 * @interface Content - Describes a key-value map, of components.
 */
export interface Content {
    //todo: write TSDoc for string index interface
    [index: string]: ComponentFactoryProps & any
}


export interface ContainerControllerProps extends BaseComponentProps {
    content: Content;
}


export abstract class ContainerController<Props extends ContainerControllerProps = ContainerControllerProps> extends BasicViewComponent<Props> {


    constructor(props: Props) {
        super(props)
    }

    getRetrievalSchema() {
    }


}
