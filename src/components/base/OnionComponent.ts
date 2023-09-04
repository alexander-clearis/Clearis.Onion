import {OnionControllerKey, OnionJSXElement, OnionRenderReturnType} from "../ONION_COMPONENT_TYPINGS";

export interface OnionController_Props {
    class?: string;
}

export abstract class OnionController<PropType extends OnionController_Props> {

    readonly KEY: OnionControllerKey;
    private readonly _props: PropType;

    constructor(key: OnionControllerKey, props: PropType) {
        this.KEY = key
        this._props = props;


    }

    get css_class() {
        return this._props.class ?? "";
    }

    protected abstract _render(): OnionRenderReturnType;

    render(): OnionRenderReturnType {
        // check if visible!

    }

}


