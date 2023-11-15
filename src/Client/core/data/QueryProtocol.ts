import {PRQL_protocol} from "./query/PRQL_protocol";

/**
 * Describes the query language for a context.
 */
export enum QueryLanguage {
    PRQL
}

export abstract class QueryProtocol {
    static getProtocol(queryLanguage: QueryLanguage): QueryProtocol {
        switch (queryLanguage) {
            case QueryLanguage.PRQL:
                return new PRQL_protocol();
        }
    }
}