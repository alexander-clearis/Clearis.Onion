import {OnionController_hasChildren, OnionController_hasChildren_Props} from "../base/OnionController_hasChildren";
import {h} from "preact";
import {OnionJSXElement, OnionRenderReturnType} from "../ONION_COMPONENT_TYPINGS";


export interface OnionContainer_Props extends OnionController_hasChildren_Props {

}

export class OnionContainer extends OnionController_hasChildren<OnionContainer_Props> {

    protected _render(): OnionRenderReturnType {
        return <div class={this.css_class}>
            {super._render()}
        </div>
    }
}

