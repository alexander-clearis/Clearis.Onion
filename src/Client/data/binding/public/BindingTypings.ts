import {AbstractValueBinding} from "../private/ValueBinding";
import {StringInputValueBinding, StringValueBinding} from "./StringValueBinding";
import {NumberInputValueBinding, NumberValueBinding} from "./NumberValueBinding";
import {ISubscribable, SubscriberCallbackMethod} from "../private/ISubscribable";
import {ListValueBinding} from "./ListValueBinding";

export type BindingUnion = AbstractValueBinding | StringValueBinding | StringInputValueBinding | NumberValueBinding | NumberInputValueBinding | ListValueBinding
export type BindingRecordBaseType = Record<string, BindingUnion>;
export type BindingSubscriptionStore = BindingSubscriptionReturnType[];
export type BindingSubscriptionReturnType = [ISubscribable, SubscriberCallbackMethod];
