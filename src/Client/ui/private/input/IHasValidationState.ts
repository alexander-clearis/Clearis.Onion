import {ValueUtils} from "../../../data/values/ValueUtils";
import GlobalValidationStateType = ValueUtils.Validation.GlobalValidationStateType;
import {InputValueBinding} from "../../../data/binding/private/ValueBinding";
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import {GlobalValueType} from "../../../data/values/GlobalValueType";
import {ValueProperties} from "../../../data/binding/public/ValueBindingProps";
import BaseInputValueProperties = ValueProperties.BaseInputValueProperties;

type SupportedStates<StateEnum> = StateEnum | GeneralValidationState

export interface IHasValidationState<GenericStates extends GlobalValidationStateType = GeneralValidationState> {


    //todo: clean up typings
    pushValidationState<ValueType extends GlobalValueType = GlobalValueType, Properties extends BaseInputValueProperties = BaseInputValueProperties>(source: InputValueBinding<ValueType, Properties, GenericStates>, state: SupportedStates<GenericStates>);

    clearValidationState<ValueType extends GlobalValueType = GlobalValueType, Properties extends BaseInputValueProperties = BaseInputValueProperties>(source: InputValueBinding<ValueType, Properties, GenericStates>);
}