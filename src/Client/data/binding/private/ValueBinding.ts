import {iValue} from "../../values/IValue";
import {SubscriberCallbackMethod} from "./ISubscribable";
import {GlobalValueType} from "../../values/GlobalValueType";
import {ValueUtils} from "../../values/ValueUtils";
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import GlobalValidationStateType = ValueUtils.Validation.GlobalValidationStateType;
import {IDataSource, isSourceable} from "../../../core/IDataSource";
import {Subscribable} from "./Subscribable";

import {ValueBindingPropSpaces} from "../public/ValueBindingProps";
import BaseDisplayValueProperties_1 = ValueBindingPropSpaces.BaseDisplayValueProperties;
import ValueFormatType = ValueBindingPropSpaces.ValueFormatType;
import BaseInputValueProperties = ValueBindingPropSpaces.BaseInputValueProperties;

//THIS DOESN'T FAIL


const pathSeparator = "/"

export abstract class AbstractValueBinding<Type extends GlobalValueType = GlobalValueType, ValuePropertyType extends BaseDisplayValueProperties_1 = BaseDisplayValueProperties_1> extends Subscribable<Type> {

    protected pathBindingRecords: PathBindingRecord[];
    protected endPoint?: iValue<Type>;

    private _source: IDataSource;

    private _query: string;

    protected properties: ValuePropertyType;
    constructor(_source: IDataSource, _query: string, valueProperties: ValuePropertyType) {
        super();


        this._source = _source;
        this._query = _query;
        this.properties = valueProperties;

        this.pathBindingRecords = this.createPathBindingRecords(_query);
        this.refresh();
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

    private getSource(index: number): IDataSource | undefined {
        if (index === 0) {
            return this._source;
        }

        let source = this.pathBindingRecords[index - 1];
        if (source.resolvesTo?.value != undefined) {
            if (isSourceable(source.resolvesTo.value)) {
                return source.resolvesTo.value
            } else {
                throw new Error(`"${source.path}", can't be used as a source in a path. At: ${this._query}`)
            }
        }
        return undefined
    }

    private getRefreshFromIndex(from: string | number | undefined): number {
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


    public refresh(from?: string | number) {
        const refreshFromIndex = this.getRefreshFromIndex(from)

        for (let currentIndex = refreshFromIndex; currentIndex < this.pathBindingRecords.length; currentIndex++) {
            let valueToRefresh = this.pathBindingRecords[currentIndex];


            //unsubscribe!
            if (valueToRefresh.onChange) {
                valueToRefresh.resolvesTo?.unsubscribe(valueToRefresh.onChange);
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

    get format(): ValueFormatType | undefined {
        return this.properties.format
    }

    public get(): Type | undefined {

        return this.endPoint?.value;
    }

    abstract getFormatted(): string | undefined


    protected setValue(value: Type | undefined) {
        if(this.endPoint) {
            this.endPoint.value = value
        }
    }

}


type PathBindingRecord<T extends GlobalValueType = GlobalValueType> = {
    path: string;
    resolvesTo?: iValue<T>,
    onChange?: SubscriberCallbackMethod<T>
};

export interface InputValueBinding<Type extends GlobalValueType = GlobalValueType, ValuePropertyType extends BaseInputValueProperties = BaseInputValueProperties, ValidationState extends GlobalValidationStateType = GeneralValidationState> extends AbstractValueBinding<Type, ValuePropertyType> {
    set(value: Type): void

    isRequired: boolean
}
