import {ComponentChild, h} from "preact";
import {BaseComponentProps, BasicComponentState, BasicViewComponent} from "../base/BasicViewController";
import {StringValueBinding} from "../../../data/binding/public/StringValueBinding";
import {ListValueBinding} from "../../../data/binding/public/ListValueBinding";
import {ListContext} from "../../../core/context/DataContext";
import {BindingProperties} from "../../../core/getPage/ContentDefinition";
import {SampleComponent} from "../../public/SampleComponent";
import {OnionObject} from "../../../data/object/OnionObject";
import {iHasContent} from "../container/ContainerControllerProps";
import {OnionProtoClient} from "../../../core/OnionProtoClient";

export type ListComponentBindingMap = {}

export interface ListComponentProps extends BaseComponentProps<ListComponentBindingMap>, iHasContent {
    iterator: BindingProperties

}

export interface ListComponentState extends BasicComponentState {

}

export class ListComponent extends BasicViewComponent<ListComponentBindingMap, ListComponentProps, ListComponentState> {
    private readonly _iterator: ListContext<OnionObject>
    get iterator(): ListContext<OnionObject> {
        return this._iterator;
    }

    constructor(props: ListComponentProps) {
        super(props);
        //todo: try to remove assertion
        this._iterator = this.props.contextSource.get(this.props.iterator.path) as ListContext<OnionObject>;
    }

    protected initBindings(): ListComponentBindingMap {
        return {}
    }

    getRetrievalSchema(): void {
        throw Error("This method has not been implemented. (getRetrievalSchema)")
    }


    componentDidMount() {
        super.componentDidMount();
        this.addSubscription(this._iterator.subscribe(() => {
            this.forceUpdate()
        }))
    }

    render(): ComponentChild {
        return <div>
            {
                this.iterator.map(iteratorContext => OnionProtoClient.view.createComponents(this.props.content, iteratorContext.value!))
            }
        </div>;
    }
}