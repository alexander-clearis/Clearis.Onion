import {Component, ComponentChild, h, RenderableProps} from "preact";
import {BaseComponentProps, ViewController} from "../private/base/ViewController";
import {IDataSource} from "../../core/IDataSource";
import {StringInputValueBinding} from "../../data/binding/public/StringValueBinding";


export interface SimpleInputProps extends BaseComponentProps {
    componentType: "SimpleInputController"
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
    binding?: StringInputValueBinding

    componentDidMount() {
        this.binding = new StringInputValueBinding(this.props.source, this.props.path, {required: true})
        this.binding.subscribe(this.valueBind);
    }

    valueBind = (value: string | undefined) => {
        this.setState({value: value});
    }

    componentWillUnmount() {
        this.binding?.unsubscribe(this.valueBind);
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.binding?.set(event.currentTarget.value)
    }

    render(props?: RenderableProps<{ path: string; source: IDataSource }>, state?: Readonly<{ value: any }>, context?: any): ComponentChild {
        return <div><input type={"text"} value={this.state.value} onChange={(event) => {
            this.onChange(event)
        }
        }/></div>;
    }
}