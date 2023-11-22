import {
    BaseComponentProps,
    BasicComponentState,
    BasicViewComponent,
} from "../private/base/BasicViewController";
import {Component, ComponentChild, ComponentClass, ComponentType, h} from "preact";
import {SampleComponent} from "./SampleComponent";
import {ListComponent} from "../private/list/ListComponent";
export type ComponentConstructor = new (props: any & BaseComponentProps, context?: any) => Component<any & BaseComponentProps, any>;


export const entries: { [key: string]: ComponentConstructor } = {
    "SampleComponent": SampleComponent,
    "ListComponent": ListComponent
}


