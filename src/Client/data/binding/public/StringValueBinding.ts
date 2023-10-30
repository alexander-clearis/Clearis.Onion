import {AbstractValueBinding, InputValueBinding} from "../private/ValueBinding";
import {ValueProperties} from "./ValueBindingProps";
import {ValueUtils} from "../../values/ValueUtils";
import {IHasValidationState} from "../../../ui/private/input/IHasValidationState";
import DisplayValueProperties = ValueProperties.String.DisplayValueProperties;
import InputValueProperties = ValueProperties.String.InputValueProperties;
import RegexType = ValueUtils.String.RegexType;
import applyCaseTransform = ValueUtils.String.applyCaseTransform;
import matchesRegex = ValueUtils.String.matchesRegex;
import applyRegexReplace = ValueUtils.String.applyRegexReplace;
import stringIsEmpty = ValueUtils.String.stringIsEmpty;
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import StringValidationState = ValueUtils.Validation.StringValidationState;


export class StringValueBinding<VProperties extends DisplayValueProperties = DisplayValueProperties> extends AbstractValueBinding<string, VProperties> {

    getFormatted(): string | undefined {
        throw new Error("This method has not been implemented")
    }
}

export class StringInputValueBinding extends StringValueBinding<InputValueProperties> implements InputValueBinding<string, InputValueProperties, StringValidationState> {


    set(value: string, validationTarget?: IHasValidationState<ValueUtils.Validation.StringValidationState>): void {
        //Apply Casing
        if (this.properties.useCaseTransform) {
            value = applyCaseTransform(value, this.properties.useCaseTransform);
        }
        //Check for regex else break.
        if (this.regex && !matchesRegex(value, this.regex)) {
            validationTarget.pushValidationState(this, StringValidationState.REGEX);
            return;
        }
        //Apply regex replace.
        if (this.properties.regexReplace) {
            value = applyRegexReplace(value, this.properties.regexReplace);
        }
        if (stringIsEmpty(value)) {
            //check if required, else break. If not apply null!
            if (this.isRequired) {
                validationTarget.pushValidationState(this, GeneralValidationState.IS_REQUIRED);
                return;
            } else {
                this.setValue(undefined);
                return;
            }
        } else {
            //remove spaces
            value = value.trim();

            if (this.minValue && value.length < this.minValue) {
                validationTarget.pushValidationState(this, StringValidationState.minValue);
                return;
            } else if (this.maxValue && value.length > this.maxValue) {
                validationTarget.pushValidationState(this, StringValidationState.maxValue);
            } else {
                //is valid!
                validationTarget.clearValidationState(this);
                this.setValue(value);
                return;
            }
        }
    }

    get isRequired(): boolean {
        return this.properties.required;
    }

    get regex(): RegexType | undefined {
        return this.properties.regex;
    }

    get minValue(): number | undefined {
        return this.properties.minValue;
    }

    get maxValue(): number | undefined {
        return this.properties.maxValue;
    }

}



