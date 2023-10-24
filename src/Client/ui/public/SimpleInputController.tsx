import {Component, ComponentChild, h, RenderableProps} from "preact";
import {BaseComponentProps, ViewController} from "../private/base/ViewController";
import {OnewWay_ValueBinding} from "../../data/binding/OnewWay_ValueBinding";
import {IDataSource} from "../../core/IDataSource";
import {TwoWay_ValueBinding} from "../../data/binding/TwoWay_ValueBinding";


export interface SimpleInputProps extends BaseComponentProps {
    path: string
}

export class SimpleInputController extends ViewController<SimpleInputProps> {
    getRetrievalSchema() {
        return this.props.path;
    }

    render(): ComponentChild {
        return <SimpleInputComponent path={this.props.path} source={this.dataSource}/>;
    }


}

export class SimpleInputComponent extends Component<{ path: string, source: IDataSource }, { value: any }> {
    binding?: TwoWay_ValueBinding<string>

    componentDidMount() {
        this.binding = new TwoWay_ValueBinding<string>(this.props.source, this.props.path)
        this.binding.subscribe(this.valueBind);
    }

    valueBind = (value) => {
        this.setState({value: value});
    }

    componentWillUnmount() {
        this.binding.unsubscribe(this.valueBind);
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.binding.set(event.currentTarget.value)
    }

    render(props?: RenderableProps<{ path: string; source: IDataSource }>, state?: Readonly<{ value: any }>, context?: any): ComponentChild {
        return <div><input type={"text"} value={this.state.value} onChange={(event) => {
            this.onChange(event)
        }
        }/></div>;
    }
}