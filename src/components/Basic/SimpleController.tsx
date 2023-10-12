import {Component, ComponentChild, h, RenderableProps} from "preact";
import {BaseComponentProps, ViewController} from "../../Client/Component/ViewController";
import {ValueBinding} from "../../Client/Data/Value/ValueBinding";
import {IDataSource} from "../../Client/Data/Source/IDataSource";


export interface SimpleProps extends BaseComponentProps {
    caption: string
}

export class SimpleController extends ViewController<SimpleProps> {
    getRetrievalSchema() {
        return this.props.caption;
    }

    render(): ComponentChild {
        return undefined;
    }


}

export class SimpleComponent extends Component<{ path: string, source: IDataSource }, { value: any }> {
    binding?: ValueBinding


    componentDidMount() {
        this.binding = new ValueBinding(this.props.source, this.props.path)
        this.binding.subscribe(this.valueBind);
    }

    valueBind = (value) => {
        this.setState({value: value});
    }

    componentWillUnmount() {
        this.binding.unsubscribe(this.valueBind);
    }

    render(props?: RenderableProps<{ path: string; source: IDataSource }>, state?: Readonly<{ value: any }>, context?: any): ComponentChild {
        return <p> {this.state.value}</p>;
    }
}