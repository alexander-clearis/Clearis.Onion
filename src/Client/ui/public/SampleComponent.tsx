import {BaseComponentProps, BasicComponentState, BasicViewComponent} from "../private/base/BasicViewController";
import {ComponentChild, h} from "preact";
import {BindingProperties} from "../../core/getPage/ContentDefinition";
import {StringValueBinding} from "../../data/binding/public/StringValueBinding";

export type SampleBindingMap = {
    sampleValue1: StringValueBinding
}

export interface SampleProps extends BaseComponentProps<SampleBindingMap> {

}

export interface SampleState extends BasicComponentState {
    value?: string;
}

export class SampleComponent extends BasicViewComponent<SampleBindingMap, SampleProps, SampleState> {


    constructor(props: SampleProps) {
        super(props);

    }

    protected initBindings(): SampleBindingMap {
        return {
            sampleValue1: new StringValueBinding(this.props.contextSource, this.props.bindings.sampleValue1.path, {})
        }
    }

    getRetrievalSchema(): void {
        throw Error("This method has not been implemented. (getRetrievalSchema)")
    }


    render(): ComponentChild {
        return <div onClick={() => console.log(this)}>
            <p>Value: {this.bindings.sampleValue1.getFormatted() ?? "undefined!"}</p>
        </div>;
    }
}