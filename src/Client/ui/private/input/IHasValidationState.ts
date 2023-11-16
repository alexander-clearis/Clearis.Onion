import {ValueUtils} from "../../../data/values/ValueUtils";
import GlobalValidationStateType = ValueUtils.Validation.GlobalValidationStateType;
import {InputValueBinding} from "../../../data/binding/private/ValueBinding";
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import {GlobalValueType} from "../../../data/values/GlobalValueType";
import {ValueBindingPropSpaces} from "../../../data/binding/public/ValueBindingProps";
import BaseInputValueProperties = ValueBindingPropSpaces.BaseInputValueProperties;

type SupportedStates<StateEnum> = StateEnum | GeneralValidationState

export interface IHasValidationState<GenericStates extends GlobalValidationStateType = GeneralValidationState> {


    //todo: clean up typings
    pushValidationState<ValueType extends GlobalValueType = GlobalValueType, Properties extends BaseInputValueProperties = BaseInputValueProperties>(source: InputValueBinding<ValueType, Properties, GenericStates>, state: SupportedStates<GenericStates>): void;

    clearValidationState<ValueType extends GlobalValueType = GlobalValueType, Properties extends BaseInputValueProperties = BaseInputValueProperties>(source: InputValueBinding<ValueType, Properties, GenericStates>): void;
}