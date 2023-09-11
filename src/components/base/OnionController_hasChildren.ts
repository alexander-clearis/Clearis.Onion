import {
    ControllerChildren,
    ComponentStructure,
    ControllerKey,
    RenderReturnType
} from "../ONION_COMPONENT_TYPINGS";
import {OnionProtoClient} from "../../Client/OnionProtoClient";
import {OnionController, ControllerProps} from "./OnionComponent";

export interface Controller_hasChilderenProps extends ControllerProps {
    children: ComponentStructure;
}

export abstract class OnionController_hasChildren<PropType extends Controller_hasChilderenProps> extends OnionController<PropType> {
    private readonly _children: ControllerChildren = [];

    constructor(key: ControllerKey, props: PropType) {
        super(key, props);
        this._children = OnionProtoClient.view.createComponents(this, this.props.children);
    }

    get Children(): ControllerChildren {
        return this._children
    }

    protected _render(): RenderReturnType {
        return this._children.map(child => child.render());
    }


}