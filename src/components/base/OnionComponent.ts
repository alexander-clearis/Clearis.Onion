import {OnionControllerKey, OnionJSXElement, OnionRenderReturnType} from "../ONION_COMPONENT_TYPINGS";

export interface OnionController_Props {
    //todo: implement component type

    field?: string;
}

export abstract class OnionController<PropType extends OnionController_Props> {

    readonly KEY: OnionControllerKey;
    private readonly _props: PropType;

    constructor(key: OnionControllerKey, props: PropType) {
        this.KEY = key
        this._props = props;


    }

    get css_class() {
        return this._props.field ?? "";
    }

    protected abstract _render(): OnionRenderReturnType;

    render(): OnionRenderReturnType {
        // assign ref!
        return this._render();
    }

    get props(): PropType {
        return this._props;
    }

}


