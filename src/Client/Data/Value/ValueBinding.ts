import {ValueType, iValue} from "./IValue";
import {Subscribable} from "../subscriber/Subscribable";
import {IDataSource, isSourceable} from "../Source/IDataSource";

import {SubscriberCallbackMethod} from "../subscriber/ISubscribable";

const pathSeparator = "/"

type PathBindingRecord<T extends ValueType = ValueType> = {
    path: string;
    value?: iValue<T>,
    callback?: SubscriberCallbackMethod<T>
};

export class ValueBinding<Type extends ValueType = ValueType> extends Subscribable<Type> {

    private pathBindingRecords: PathBindingRecord[];
    private endPoint: iValue<Type> | undefined;

     constructor(private _source: IDataSource, private _query: string) {
        super();
        this.pathBindingRecords = this.createPathBindingRecords(_query);
        this.refresh();
    }

    get(): Type | undefined {
        return this.endPoint?.value;
    }


    private createPathBindingRecords(query: string): PathBindingRecord[] {
        return query.split(pathSeparator).map(path => {
            return {
                path: path,
                value: undefined,
                callback: undefined,
            }
        })
    }

    //todo: optimize resubscribe, only on change
    public refresh(from?: string | number) {
        const refreshFromIndex = this.getRefreshFromIndex(from)

        for (let iteratorIndex = 0; iteratorIndex < this.pathBindingRecords.length; iteratorIndex++) {
            const currentIndex = refreshFromIndex + iteratorIndex;
            let valueToRefresh = this.pathBindingRecords[currentIndex];


            //unsubscribe!
            if (valueToRefresh.callback) {
                valueToRefresh.value.unsubscribe(valueToRefresh.callback);
            }

            //refresh
            valueToRefresh.value = this.getSource(currentIndex).get(valueToRefresh.path);

            //subscribe
            if (valueToRefresh.value) {
                valueToRefresh.value.subscribe((value) => {
                    this.refresh(currentIndex)
                })
            }
        }

        this.endPoint = this.pathBindingRecords[this.pathBindingRecords.length - 1].value as iValue<Type>;
        this.callSubscribers(this.endPoint.value)
    }

    private getSource(index: number): IDataSource {
        if (index === 0) {
            return this._source;
        }
        let source = this.pathBindingRecords[index - 1];
        if (isSourceable(source.value)) {
            return source.value
        } else {
            throw new Error(`"${source.path}", can't be used as a source in a path. At: ${this._query}`)
        }
    }

    private getRefreshFromIndex(from: string | number): number {
        let refreshFromIndex = 0;
        if (from !== undefined) {
            if (typeof from === "string") {
                refreshFromIndex = this.pathBindingRecords.findIndex(value => value.path = from);
            } else {
                refreshFromIndex = from
            }
        }
        return refreshFromIndex;
    }


}

