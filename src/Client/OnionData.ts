import {OnionContext} from "./OnionContext";
import {ContextSchema} from "./ConsumerContext";
import SchemaStore = ContextSchema.SchemaStore;
import {OnionObject} from "./OnionObject";
import SchemaDefinition = ContextSchema.SchemaDefinition;
import ContextElement = ContextSchema.ContextElement;

type DataResult = {
    objects: { [index: string]: dataObject }
};
type dataObject = {

}
export class OnionData {

    private store: Map<string, OnionObject> = new Map();


    async retrieveSchema(schema: ContextSchema.SchemaDefinition): Promise<OnionObject | OnionObject[]> {
        return this.doDataRetrieval(schema)
    }

    private async doDataRetrieval(schema: SchemaDefinition): Promise<OnionObject | OnionObject[]> {
        const result = await this.getDataFromServer(schema);
        return this.updateState(schema, result);
    }

    private async getDataFromServer(schema: SchemaDefinition): Promise<DataResult> {
        return {} as DataResult;
    }

    private updateState(schema: ContextSchema.SchemaDefinition, result: DataResult): OnionObject | OnionObject[] {
        const dataDefenition: ContextElement = schema.contextElement;

        for (let id in result.objects) {
            let onionObject = this.store.get(id)
            if(!onionObject) {
                onionObject = new OnionObject(id);
                this.store.set(id, onionObject)
            }

            dataDefenition.attributes.forEach(definedAttribute => {
                //update refrence field in OnionObject
                let attribute = onionObject.getAttribute(definedAttribute);
                if(attribute) {

                } else {

                }
            })
            dataDefenition.references.forEach(definedRefference => {
                //update refrence field in OnionObject
                //create from context element, add to store.


            })
        }

        return {} as OnionObject
    }


}

