import {AbstractValueBinding} from "../private/ValueBinding";
import {StringInputValueBinding, StringValueBinding} from "./StringValueBinding";
import {NumberInputValueBinding, NumberValueBinding} from "./NumberValueBinding";
import {SubscriberCallbackMethod} from "../private/ISubscribable";

export type BindingUnion = AbstractValueBinding | StringValueBinding | StringInputValueBinding | NumberValueBinding | NumberInputValueBinding
export type BindingRecordBaseType = Record<string, BindingUnion>;
export type BindingSubscriptionStore = BindingSubscriptionReturnType[];
export type BindingSubscriptionReturnType = [AbstractValueBinding, SubscriberCallbackMethod];
