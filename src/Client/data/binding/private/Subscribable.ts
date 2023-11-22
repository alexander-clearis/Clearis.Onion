import {ISubscribable, SubscriberCallbackMethod, SubscriptionRegistration} from "./ISubscribable";
import {GlobalValueType} from "../../values/GlobalValueType";


export class Subscribable<Type extends GlobalValueType = GlobalValueType> implements ISubscribable<Type> {


    private _registeredCallbacks: SubscriberCallbackMethod<Type>[] = []

    callSubscribers(value: Type | undefined) {
        this._registeredCallbacks.forEach(registered_callback => {
            registered_callback(value);
        })
    }

    subscribe<ThisSubscriptionCallBackType extends SubscriberCallbackMethod<Type> = SubscriberCallbackMethod<GlobalValueType>>(callback: ThisSubscriptionCallBackType): [this, ThisSubscriptionCallBackType] {
        this._registeredCallbacks.push(callback)
        return [this, callback];
    }

    unsubscribe(callback: SubscriberCallbackMethod<Type>) {
        let indexToRemove = this._registeredCallbacks.indexOf(callback);
        this._registeredCallbacks.splice(indexToRemove, indexToRemove);
    }
}





