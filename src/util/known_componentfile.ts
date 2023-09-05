import {OnionController, OnionController_Props} from "../components/base/OnionComponent";
import {OnionContainer} from "../components/containers/OnionContainer";
import {OnionControllerKey} from "../components/ONION_COMPONENT_TYPINGS";
import {OnionContextConsumer, OnionLabelController} from "../components/label/OnionLabelController";

export type OnionComponentConstructor<T extends OnionController<PropType>, PropType = T extends OnionController<infer P> ? P : never> = new (key: OnionControllerKey, props: PropType, ...args: any[]) => T


export const entries: { [key: string]: OnionComponentConstructor<OnionController<OnionController_Props>> } = {
    "OnionContainer": OnionContainer,
    "OnionLabelController": OnionLabelController
}
