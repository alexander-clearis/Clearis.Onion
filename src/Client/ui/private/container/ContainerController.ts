import {BaseComponentProps, ViewController} from "../base/ViewController";
import {ComponentChild} from "preact";
import {IDataSource} from "../../../core/IDataSource";
import {OnionProtoClient} from "../../../core/OnionProtoClient";

/**
 * @interface Content - Describes a key-value map, of components.
 */
export interface Content {
    //todo: write TSDoc for string index interface
    [index: string]: BaseComponentProps
}


export interface ContainerProps extends BaseComponentProps {
    content: Content;
}


export abstract class ContainerController<Props extends ContainerProps = ContainerProps> extends ViewController<Props> {
    protected readonly _content: ViewController[]


    constructor(dataSource: IDataSource, props: Props) {
        super(dataSource, props);

        this._content = OnionProtoClient.view.createControllers(dataSource, this.props.content)
    }

    getRetrievalSchema() {
        return this._content.map(controller => controller.getRetrievalSchema());
    }

    render(): ComponentChild {
        return this._content.map(controller => controller.render())
    }

}