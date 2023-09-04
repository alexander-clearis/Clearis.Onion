import {OnionController, OnionController_Props} from "../components/base/OnionComponent";
import {OnionControllerChildren_Props} from "../components/ONION_COMPONENT_TYPINGS";
import {OnionController_hasChildren} from "../components/base/OnionController_hasChildren";

export class OnionView {

    public createComponents(parent: OnionController_hasChildren<OnionController_Props>, component_props: OnionControllerChildren_Props): OnionController<OnionController_Props>[] {
        //todo: merge pagebuilder

        return [] as OnionController<OnionController_Props>[]
    };

}