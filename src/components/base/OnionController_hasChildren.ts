import {
    OnionControllerChildren,
    OnionComponentStructure,
    OnionControllerKey,
    OnionRenderReturnType
} from "../ONION_COMPONENT_TYPINGS";
import {OnionProtoClient} from "../../Client/OnionProtoClient";
import {OnionController, OnionController_Props} from "./OnionComponent";

export interface OnionController_hasChildren_Props extends OnionController_Props {
    children: OnionComponentStructure;
}

export abstract class OnionController_hasChildren<PropType extends OnionController_hasChildren_Props> extends OnionController<PropType> {
    private readonly _children: OnionControllerChildren = [];

    constructor(key: OnionControllerKey, props: PropType) {
        super(key, props);
        this._children = OnionProtoClient.view.createComponents(this, this.props.children);
    }

    get Children(): OnionControllerChildren {
        return this._children
    }

    protected _render(): OnionRenderReturnType {
        return this._children.map(child => child.render());
    }


}