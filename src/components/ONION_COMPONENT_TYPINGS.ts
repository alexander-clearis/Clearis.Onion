import {OnionController, OnionController_Props} from "./base/OnionComponent";


export type OnionControllerChildren = OnionController<OnionController_Props>[];

export type OnionControllerKey = string;

export type OnionJSXElement = JSX.Element | JSX.Element[] | undefined

export type OnionComponentStructure = {
    [index: OnionControllerKey]: OnionComponentSetUp;
};
export type OnionComponentSetUp= {
    component_id: string;
    props: any;
}

export type OnionRenderReturnType = any