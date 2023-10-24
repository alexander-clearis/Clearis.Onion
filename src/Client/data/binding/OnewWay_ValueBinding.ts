import {ValueType, iValue} from "../values/IValue";
import {Subscribable} from "./Subscribable";
import {IDataSource, isSourceable} from "../../core/IDataSource";

import {SubscriberCallbackMethod} from "./ISubscribable";

const pathSeparator = "/"

type PathBindingRecord<T extends ValueType = ValueType> = {
    path: string;
    resolvesTo?: iValue<T>,
    onChange?: SubscriberCallbackMethod<T>
};

export class OnewWay_ValueBinding<Type extends ValueType = ValueType> extends Subscribable<Type> {

    protected pathBindingRecords: PathBindingRecord[];
    protected endPoint?: iValue<Type>;

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

        for (let currentIndex = refreshFromIndex; currentIndex < this.pathBindingRecords.length; currentIndex++) {
            let valueToRefresh = this.pathBindingRecords[currentIndex];


            //unsubscribe!
            if (valueToRefresh.onChange) {
                valueToRefresh.resolvesTo.unsubscribe(valueToRefresh.onChange);
            }

            //refresh
            valueToRefresh.resolvesTo = this.getSource(currentIndex)?.get(valueToRefresh.path);

            //subscribe
            if (valueToRefresh.resolvesTo != undefined) {
                valueToRefresh.resolvesTo.subscribe((value) => {
                    this.refresh(currentIndex)
                })
            } else {
                break
            }
        }

        this.endPoint = this.pathBindingRecords[this.pathBindingRecords.length - 1].resolvesTo as iValue<Type>;
        this.callSubscribers(this.endPoint?.value)
    }

    private getSource(index: number): IDataSource {
        if (index === 0) {
            return this._source;
        }

        let source = this.pathBindingRecords[index - 1];
        if(source.resolvesTo.value != undefined) {
            if (isSourceable(source.resolvesTo.value)) {
                return source.resolvesTo.value
            } else {
                throw new Error(`"${source.path}", can't be used as a source in a path. At: ${this._query}`)
            }
        }
        return undefined
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
