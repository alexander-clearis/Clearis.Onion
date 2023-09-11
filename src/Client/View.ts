import {OnionController, ControllerProps} from "../components/base/OnionComponent";
import {ComponentSetup, ComponentStructure} from "../components/ONION_COMPONENT_TYPINGS";
import {
    OnionController_hasChildren,
    Controller_hasChilderenProps
} from "../components/base/OnionController_hasChildren";
import {entries, OnionComponentConstructor} from "../util/known_componentfile";


export class View {

    public createComponents(parent: OnionController_hasChildren<Controller_hasChilderenProps>, componentStructure: ComponentStructure): OnionController<ControllerProps>[] {
        let componentList = [];
        for (let key in componentStructure) {
            let createdComponent;
            try {
                createdComponent = this.createComponent(parent, key, componentStructure[key])

            } catch (e) {
                console.error(e)
            }
            if(createdComponent) {
                componentList.push(createdComponent)
            }
        }

        return componentList as OnionController<ControllerProps>[]
    };

    public createComponent(parent: OnionController_hasChildren<Controller_hasChilderenProps>, key, setUpProps: ComponentSetup): OnionController<any> {
        if (key == null) {
            throw new Error("Key shouldn't be null");
        }
        let componentConstructor: OnionComponentConstructor<OnionController<unknown>>;
        try {
            componentConstructor = this.getComponentConstructor(setUpProps.component_id)
            return new componentConstructor(key, setUpProps.props);
        } catch (e) {
            console.error(e)
        }

    }

    public getComponentConstructor(ComponentName: string): OnionComponentConstructor<OnionController<unknown>> {
        if (entries.hasOwnProperty(ComponentName)) {
            return entries[ComponentName];
        } else {
            throw new Error(`No constructor found for: ${ComponentName}  in constructor entries.`)
        }
    }


    //todo: implement get page.
}

