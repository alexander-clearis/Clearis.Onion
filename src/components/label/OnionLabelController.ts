import {OnionController, OnionController_Props} from "../base/OnionComponent";
import {OnionRenderReturnType} from "../ONION_COMPONENT_TYPINGS";
import {IContextConsumer} from "../base/IContextConsumer";
import {ContextSchema} from "../../Client/ConsumerContext";
import SchemaStore = ContextSchema.SchemaStore;
import SchemaDefinition = ContextSchema.SchemaDefinition;
import ContextElement = ContextSchema.ContextElement;
import Attribute = ContextSchema.Attribute;


export interface OnionContextConsumer_Props extends OnionController_Props {

}

export abstract class OnionContextConsumer extends OnionController<OnionContextConsumer_Props> implements IContextConsumer {


    protected _render(): OnionRenderReturnType {
        return undefined;
    }

    public abstract getSchema(): ContextSchema.SchemaDefinition;


}

export interface OnionLabel_Props extends OnionController_Props {
    contextName: string;


}

export abstract class OnionLabelController extends OnionController<OnionContextConsumer_Props> implements IContextConsumer {

    protected _render(): OnionRenderReturnType {
        return undefined;
    }

    public getSchema(): ContextSchema.SchemaDefinition {
        return new SchemaDefinition("context_1", this, ContextElement.create("entity", this, [new Attribute("field", this)]), false);
    };



}

