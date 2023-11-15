import {AbstractValueBinding, InputValueBinding} from "../private/ValueBinding";
import {ValueProperties} from "./ValueBindingProps";
import {ValueUtils} from "../../values/ValueUtils";
import DisplayValueProperties = ValueProperties.String.DisplayValueProperties;
import InputValueProperties = ValueProperties.String.InputValueProperties;
import RegexType = ValueUtils._String.RegexType;
import applyCaseTransform = ValueUtils._String.applyCaseTransform;
import matchesRegex = ValueUtils._String.matchesRegex;
import applyRegexReplace = ValueUtils._String.applyRegexReplace;
import String_isNullOrEmpty = ValueUtils._String.String_isNullOrEmpty;
import ValidationError = ValueUtils.Validation.ValidationError;
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import StringValidationState = ValueUtils.Validation.StringValidationState;


export class StringValueBinding<VProperties extends DisplayValueProperties = DisplayValueProperties> extends AbstractValueBinding<string, VProperties> {

    //todo: implement formatting @Gerrit.
    getFormatted(): string | undefined {
        throw new Error("This method has not been implemented")
    }
}

export class StringInputValueBinding extends StringValueBinding<InputValueProperties> implements InputValueBinding<string, InputValueProperties, StringValidationState> {
    set(value: string): void {
        //Check if required and empty else break.
        if (this.isRequired && String_isNullOrEmpty((value))) {
            throw new ValidationError(GeneralValidationState.IS_REQUIRED, "Value cannot be null or empty.")
        }
        // Check empty, the set the value directly.
        if (String_isNullOrEmpty(value)) {
            this.setValue(undefined);
            return;
        }

        //Apply Casing
        if (this.properties.useCaseTransform) {
            value = applyCaseTransform(value, this.properties.useCaseTransform);
        }
        //Check for regex else break.
        if (this.regex && !matchesRegex(value, this.regex)) {
            throw new ValidationError(StringValidationState.REGEX, "Value doesn't match regex")
        }
        //Apply regex replace.
        if (this.properties.regexReplace) {
            value = applyRegexReplace(value, this.properties.regexReplace);
        }


        //remove spaces
        value = value.trim();
        if (this.minValue && value.length < this.minValue) {
            throw new ValidationError(StringValidationState.MIN_VALUE, `Value must be longer then ${this.minValue} characters, but is ${value.length} characters long.`)
        } else if (this.maxValue && value.length > this.maxValue) {
            throw new ValidationError(StringValidationState.MAX_VALUE, `Value must be shorter then ${this.maxValue} characters, but is ${value.length} characters long.`)

        } else {
            this.setValue(value);
            return;
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



