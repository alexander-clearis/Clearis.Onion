import {ControllerKey, OnionJSXElement, RenderReturnType} from "../ONION_COMPONENT_TYPINGS";

export interface ControllerProps {
    //todo: implement component type

    field?: string;
}

export abstract class OnionController<PropType extends ControllerProps> {

    readonly KEY: ControllerKey;
    private readonly _props: PropType;

    constructor(key: ControllerKey, props: PropType) {
        this.KEY = key
        this._props = props;


    }

    get css_class() {
        return this._props.field ?? "";
    }

    protected abstract _render(): RenderReturnType;

    render(): RenderReturnType {
        // assign ref!
        return this._render();
    }

    get props(): PropType {
        return this._props;
    }

}


