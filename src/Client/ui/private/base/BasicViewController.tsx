import {Component, ComponentChild, h, RenderableProps} from "preact";
import {Data} from "../../../core/Data";
import {IDataSource} from "../../../core/IDataSource";

export interface ComponentFactoryProps {
    readonly componentType: string;
}
export interface BaseComponentProps extends ComponentFactoryProps{
    contextSource: IDataSource
}

export interface BasicComponentState {
    thisIsABaseComponentStateProp: string
}


export abstract class BasicViewComponent<Props extends BaseComponentProps, State extends BasicComponentState = BasicComponentState> extends Component<Props, State> {

    constructor(props: Props) {
        super(props, undefined);

    }
    abstract getRetrievalSchema(): void;

    abstract render(): ComponentChild;

    abstract render(props?: RenderableProps<Props>, state?: Readonly<State>, context?: any): ComponentChild
}



