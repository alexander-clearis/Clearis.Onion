import {BaseComponentProps, BasicViewComponent} from "../base/BasicViewController";
import {Content} from "../../../core/getPage/ContentDefinition";

export interface ContainerControllerProps extends BaseComponentProps {
    content: Content;
}


export abstract class ContainerController<Props extends ContainerControllerProps = ContainerControllerProps> extends BasicViewComponent<{},Props> {


    constructor(props: Props) {
        super(props)
    }

    getRetrievalSchema() {
    }


}
