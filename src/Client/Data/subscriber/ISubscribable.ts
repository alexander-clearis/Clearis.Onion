import {ValueType} from "../Value/IValue";
import {Subscribable} from "./Subscribable";
export type SubscriberCallbackMethod<Type extends ValueType = ValueType> = (value: Type) => void

export interface ISubscribable<Type extends ValueType = ValueType> {
    subscribe(callback: SubscriberCallbackMethod<Type>)

    unsubscribe(callback: SubscriberCallbackMethod<Type>)
}