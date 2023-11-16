import {PRQL_protocolasdf} from "./query/PRQL_protocol";

/**
 * Describes the query language for a context.
 */
export enum QueryLanguage {
    PRQL
}


export abstract class QueryProtocol {

    constructor(value: string) {
    }

}
