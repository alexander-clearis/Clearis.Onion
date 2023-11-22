import {GlobalValueType, PropertyValueType} from "../../values/GlobalValueType";
export type SubscriberCallbackMethod<Type extends GlobalValueType = GlobalValueType> = (value: Type | undefined) => void
export type SubscriptionRegistration = [ISubscribable, SubscriberCallbackMethod]

export interface ISubscribable<Type extends GlobalValueType = GlobalValueType> {
    subscribe<S extends SubscriberCallbackMethod<Type>>(callback: S): [this, S]

    unsubscribe(callback: SubscriberCallbackMethod<Type>): void
}