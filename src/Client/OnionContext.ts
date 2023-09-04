import {ContextSchema} from "./ConsumerContext";
import SchemaDefinition = ContextSchema.SchemaDefinition;
import SchemaDictionary = ContextSchema.SchemaStore;
import {IContextConsumer} from "../components/base/IContextConsumer";
import SchemaStore = ContextSchema.SchemaStore;
import {OnionProtoClient} from "./OnionProtoClient";

export class OnionContext {
    readonly schemaStore = new SchemaStore();
    readonly used_by: IContextConsumer[] = []
    addConsumer(consumer: IContextConsumer) {

        this.schemaStore.addSchema(consumer.getSchema());
        this._addConsumerToList(consumer);
    }
    private _addConsumerToList(consumer: IContextConsumer) {
        let found = this.used_by.find(existing => existing == consumer);
        if (!found) {
        }
        this.used_by.push(consumer);
    }

    refresh() {
        this.schemaStore.getSchemas().forEach(schema => {
            OnionProtoClient.data.retrieveSchema(schema);
        })
    }
}