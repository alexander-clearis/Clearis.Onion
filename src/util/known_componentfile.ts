import {OnionController, ControllerProps} from "../components/base/OnionComponent";
import {Container} from "../components/containers/Container";
import {ControllerKey} from "../components/ONION_COMPONENT_TYPINGS";
import {OnionContextConsumer, OnionLabelController} from "../components/label/OnionLabelController";

export type OnionComponentConstructor
    <T extends OnionController<PropType>, PropType = T extends OnionController<infer P> ? P : never> =
    new (key: ControllerKey, props: PropType, ...args: any[]) => T


export const entries: { [key: string]: OnionComponentConstructor<OnionController<ControllerProps>> } = {
    "OnionContainer": Container,
    "OnionLabelController": OnionLabelController
}

