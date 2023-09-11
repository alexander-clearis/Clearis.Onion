import {OnionController_hasChildren, Controller_hasChilderenProps} from "../base/OnionController_hasChildren";
import {h} from "preact";
import {OnionJSXElement, RenderReturnType} from "../ONION_COMPONENT_TYPINGS";
import {entries} from "../../util/known_componentfile";


export interface ContainerProps extends Controller_hasChilderenProps {

}

export class Container extends OnionController_hasChildren<ContainerProps> {



    protected _render(): RenderReturnType {
        return <div class={this.css_class}>
            {super._render()}
        </div>
    }
}



