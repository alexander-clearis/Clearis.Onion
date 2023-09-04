import {
    OnionControllerChildren,
    OnionControllerChildren_Props,
    OnionControllerKey,
    OnionRenderReturnType
} from "../ONION_COMPONENT_TYPINGS";
import {OnionProtoClient} from "../../Client/OnionProtoClient";
import {OnionController, OnionController_Props} from "./OnionComponent";

export interface OnionController_hasChildren_Props extends OnionController_Props {

}

export abstract class OnionController_hasChildren<PropType extends OnionController_hasChildren_Props> extends OnionController<PropType> {
    private readonly _children: OnionControllerChildren = [];

    constructor(key: OnionControllerKey, props: PropType, children_props: OnionControllerChildren_Props) {
        super(key, props);
        this._children = OnionProtoClient.view.createComponents(this, children_props);
    }

    get Children(): OnionControllerChildren {
        return this._children
    }

    protected _render(): OnionRenderReturnType {
        return this._children.map(child => child.render());
    }
}