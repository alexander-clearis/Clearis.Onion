import {ComponentChild} from "preact";
import {State} from "../Data/Source/State";
import {IDataSource} from "../Data/Source/IDataSource";


export interface BaseComponentProps {
    readonly discriminator: string;
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

