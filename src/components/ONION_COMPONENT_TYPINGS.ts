import {OnionController, OnionController_Props} from "./base/OnionComponent";


export type OnionControllerChildren = OnionController<OnionController_Props>[];

export type OnionControllerKey = string;

export type OnionJSXElement = JSX.Element | JSX.Element[] | undefined

export type OnionControllerChildren_Props = {
    [index: OnionControllerKey]: OnionController_Props;
};


export type OnionRenderReturnType = any