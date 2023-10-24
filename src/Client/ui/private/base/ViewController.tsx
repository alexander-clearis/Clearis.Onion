import {ComponentChild} from "preact";
import {Data} from "../../../core/Data";
import {IDataSource} from "../../../core/IDataSource";


export interface BaseComponentProps {
    readonly componentType: string;
}


export abstract class ViewController<P extends BaseComponentProps = BaseComponentProps> {
    private readonly _dataSource: IDataSource
    protected get dataSource(): IDataSource {
        return this._dataSource;
    }

    constructor(dataSource: IDataSource, protected readonly props: P) {
        this._dataSource = dataSource
    }

    abstract getRetrievalSchema();

    abstract render(): ComponentChild;
}

