import {ContextSchema} from "./ConsumerContext";
import SchemaDefinition = ContextSchema.Schema;
import {ContextConsumerPath, IContextConsumer} from "../components/base/IContextConsumer";
import {OnionProtoClient} from "./OnionProtoClient";
import Schema = ContextSchema.Schema;
import * as crypto from "crypto";

export class SchemaState {
    schema: SchemaDefinition;
    trackIDS: [];
    count: number;
}

//const samplepath: '@contextNaam.account.defaultcontactpersoon.hoofaddress.straatnaam'
export namespace Contextparser {


}

export class Context {
    private readonly schemaStore = new Map<string, SchemaDefinition>();

    createRetrievalSchema(contextConsumerPaths: ContextConsumerPath[]) {

    }

    refresh() {

    }


}