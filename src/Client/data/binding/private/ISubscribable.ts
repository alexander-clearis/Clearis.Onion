import {GlobalValueType} from "../../values/GlobalValueType";
export type SubscriberCallbackMethod<Type extends GlobalValueType = GlobalValueType> = (value: Type) => void

export interface ISubscribable<Type extends GlobalValueType = GlobalValueType> {
    subscribe(callback: SubscriberCallbackMethod<Type>)

    unsubscribe(callback: SubscriberCallbackMethod<Type>)
}