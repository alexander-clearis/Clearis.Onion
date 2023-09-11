import {OnionController, ControllerProps} from "./base/OnionComponent";


export type ControllerChildren = OnionController<ControllerProps>[];

export type ControllerKey = string;

export type OnionJSXElement = JSX.Element | JSX.Element[] | undefined


export interface ComponentStructure {
    [index: ControllerKey]: ComponentSetup;
}

export interface ComponentSetup {
    component_id: string;
    props: any;
}

export type RenderReturnType = any