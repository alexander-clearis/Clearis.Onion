import {Component, ComponentChild, h, RenderableProps} from "preact";
import {BaseComponentProps, ViewController} from "../private/base/ViewController";
import {AbstractValueBinding} from "../../data/binding/private/ValueBinding";
import {IDataSource} from "../../core/IDataSource";
import {StringValueBinding} from "../../data/binding/public/StringValueBinding";


export interface SimpleProps extends BaseComponentProps {
    path: string
}

export class SimpleController extends ViewController<SimpleProps> {
    getRetrievalSchema() {
        return this.props.path;
    }

    render(): ComponentChild {
        return <SimpleComponent path={this.props.path} source={this.dataSource}/>;
    }


}

export class SimpleComponent extends Component<{ path: string, source: IDataSource }, { value: any }> {
    binding?: AbstractValueBinding


    componentDidMount() {
        this.binding = new StringValueBinding(this.props.source, this.props.path, {})
        this.binding.subscribe(this.valueBind);
    }

    valueBind = (value) => {
        this.setState({value: value});
    }

    componentWillUnmount() {
        this.binding.unsubscribe(this.valueBind);
    }

    render(props?: RenderableProps<{ path: string; source: IDataSource }>, state?: Readonly<{ value: any }>, context?: any): ComponentChild {
        return <p> {this.state.value} </p>;
    }
}