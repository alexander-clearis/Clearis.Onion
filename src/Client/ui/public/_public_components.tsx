import {CSS_SWITCHER} from "../../../Components/app";
import {BaseComponentProps, BasicComponentState, BasicViewComponent} from "../private/base/BasicViewController";
import {Component, ComponentChild, ComponentClass, ComponentType, h} from "preact";


type ctor<P extends BaseComponentProps> = (props?: P, context?: any) => BasicViewComponent<P>

export interface SampleProps extends BaseComponentProps {
    value?: string;
}

class SampleComponent extends BasicViewComponent<SampleProps, BasicComponentState> {

    constructor(props: SampleProps) {
        super(props);
    }

    getRetrievalSchema(): void {
    }

    render(): ComponentChild {
        return <div>
            <p>This is a Sample Component.</p>
            <p>Value: {this.props.value ?? "undefined"}</p>
        </div>;
    }

}

export type ComponentConstructor = new (props: any & BaseComponentProps, context?: any) => Component<any & BaseComponentProps, any>;
export const entries: { [key: string]: ComponentConstructor } = {
    "SampleComponent": SampleComponent

}


