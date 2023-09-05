import {Component, ComponentClass} from "preact";
import {OnionController, OnionController_Props} from "../components/base/OnionComponent";
import {OnionContainer} from "../components/containers/OnionContainer";
import {OnionControllerKey} from "../components/ONION_COMPONENT_TYPINGS";
import {OnionLabelController} from "../components/label/OnionLabelController";
class bla {

}

type OnionComponentClass<T extends OnionController<unknown>> = T extends OnionController<infer P> ? T : never;
export const entries: { [key: string]: AbstractConstructor<OnionController<unknown>> } = {
    "OnionContainer": OnionContainer,
}
let entry = entries["OnionContainer"];

let entry1 = new entry(undefined, undefined, undefined);



type AbstractConstructor
    <T extends OnionController<PropType>, PropType = T extends OnionController<infer P> ? P : never>
    =
     new (key: OnionControllerKey, props: PropType, ...args: any[]) => T
