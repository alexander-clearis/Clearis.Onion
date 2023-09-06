import {ContextSchema} from "../../Client/ConsumerContext";
import SchemaDefinition = ContextSchema.SchemaDefinition;

export interface IContextConsumer {
    getSchema(): SchemaDefinition

}