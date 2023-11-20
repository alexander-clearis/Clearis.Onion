import {BaseComponentProps, BasicComponentState, BasicViewComponent} from "../private/base/BasicViewController";
import {StringValueBinding} from "../../data/binding/public/StringValueBinding";
import {ComponentChild, h} from "preact";

export interface SampleProps extends BaseComponentProps {
    value: string;
}

export interface SampleState extends BasicComponentState {
    value?: string;
}

export class SampleComponent extends BasicViewComponent<SampleProps, SampleState> {

    private stringProperty: StringValueBinding;
    constructor(props: SampleProps) {
        super(props);
        this.stringProperty = new StringValueBinding(this.props.contextSource, this.props.value, {})
    }

    getRetrievalSchema(): void {
        throw Error("This method has not been implemented. (getRetrievalSchema)")
    }

    componentDidMount() {
        this.stringProperty.subscribe(this.subscriptionCallback)
    }
    componentWillUnmount() {
        this.stringProperty.unsubscribe(this.subscriptionCallback)
    }


    subscriptionCallback = (value: string | undefined) => {
        this.setState({value: value})
    }

    render(): ComponentChild {
        return <div>
            <p>This is a Sample Component.</p>
        <p>Value: {this.state.value ?? "undefined!"}</p>
        </div>;
    }
}