import {GlobalValueType} from "../../values/GlobalValueType";
export type SubscriberCallbackMethod<Type extends GlobalValueType = GlobalValueType> = (value: Type | undefined) => void

export interface ISubscribable<Type extends GlobalValueType = GlobalValueType> {
    subscribe(callback: SubscriberCallbackMethod<Type>): void

    unsubscribe(callback: SubscriberCallbackMethod<Type>): void
}