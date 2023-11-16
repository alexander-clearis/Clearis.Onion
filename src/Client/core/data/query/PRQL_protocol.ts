import {QueryLanguage, QueryProtocol} from "../QueryProtocol";

export class PRQL_protocolasdf extends QueryProtocol {

    public imDifferent: string = "Ik ben prql"
    constructor() {
        super("asdf");
    }
}


export function getProtocol(queryLanguage: QueryLanguage): QueryProtocol | undefined {
    switch (queryLanguage) {
        case QueryLanguage.PRQL:
            return (new PRQL_protocolasdf());
        default:
            break;

    }
}
