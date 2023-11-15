import {ISubscribable, SubscriberCallbackMethod} from "./ISubscribable";
import {GlobalValueType} from "../../values/GlobalValueType";


export class Subscribable<Type extends GlobalValueType = GlobalValueType> implements ISubscribable {
    private _registeredCallbacks: SubscriberCallbackMethod<Type>[] = []

    callSubscribers(value: Type | undefined) {
        this._registeredCallbacks.forEach(registered_callback => {
            registered_callback(value);
        })
    }


    subscribe(callback: SubscriberCallbackMethod<Type>) {
        this._registeredCallbacks.push(callback)
    }

    unsubscribe(callback: SubscriberCallbackMethod<Type>) {
        let indexToRemove = this._registeredCallbacks.indexOf(callback);
        this._registeredCallbacks.splice(indexToRemove, indexToRemove);
    }
}





