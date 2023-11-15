import {ValueProperties} from "./ValueBindingProps";
import {AbstractValueBinding, InputValueBinding} from "../private/ValueBinding";
import {ValueUtils} from "../../values/ValueUtils";
import DisplayValueProperties = ValueProperties.Number.DisplayValueProperties;
import NumberValidationState = ValueUtils.Validation.NumberValidationState;
import ValueScaleType = ValueProperties.ValueScaleType;
import InputValueProperties = ValueProperties.Number.InputValueProperties;
import Number_isNullOrEmpty = ValueUtils._Number.Number_isNullOrEmpty;
import GeneralValidationState = ValueUtils.Validation.GeneralValidationState;
import ValidationError = ValueUtils.Validation.ValidationError;
import String_isNullOrEmpty = ValueUtils._String.String_isNullOrEmpty;
import Number_isNaN = ValueUtils._Number.Number_isNaN;

export class NumberValueBinding<VProperties extends DisplayValueProperties = DisplayValueProperties> extends AbstractValueBinding<number, VProperties> {
    getFormatted(): string | undefined {
        throw new Error("This method has not been implemented.")
    }

    getScale(): ValueScaleType | undefined {
        return this.properties.scale
    }
}

export class NumberInputValueBinding extends NumberValueBinding<InputValueProperties> implements InputValueBinding<number, InputValueProperties, NumberValidationState> {

    set(value: number | string | undefined): void {
        let parsedValue: number | undefined
        // if value is a string parse to
        if (typeof value === "string") {
            value = NumberInputValueBinding.parse(value)
        } else {
            parsedValue = value;
        }

        //check if parsed value, is a valid number
        if(Number_isNaN(value)) {
            throw new ValidationError(NumberValidationState.NaN, "Value is not a valid number.");
        }

        //Check if required and empty else break.
        if (this.isRequired && Number_isNullOrEmpty((value))) {
            throw new ValidationError(GeneralValidationState.IS_REQUIRED, "Value cannot be null or empty.");
        }
        // Check empty, the set the value directly.
        if (Number_isNullOrEmpty(value)) {
            this.setValue(undefined);
            return;
        }

        //Check min value
        if (this.minValue && value < this.minValue) {
            throw new ValidationError(NumberValidationState.MIN_VALUE, `Value must be higher then ${this.minValue}, but is ${value}.`);
        } else if (this.maxValue && value > this.maxValue) {
            throw new ValidationError(NumberValidationState.MAX_VALUE, `Value must be lower then ${this.maxValue}, but is ${value}.`);
        }

    }

    // todo: write unit-test
    // todo: add multiple format Supports (https://en.wikipedia.org/wiki/Decimal_separator, https://docs.google.com/document/d/17ccLIWmBdkkRl4sGuV9QipQ-Jdf6WqkXhGqWW2PThI4/edit?usp=sharing)
    static parse(value: number | string | undefined): number | undefined {
        //Check if string is null or empty else return
        if(value == undefined || typeof value === "number") {
            return value
        }
        if (String_isNullOrEmpty(value)) {
            return undefined;
        }
        //Remove unnecessary spaces.
        value = value.trim();
        //find the index of the last separetor
        return +value;
    }

    get isRequired(): boolean {
        return this.properties.required;
    }

    get minValue(): number | undefined {
        return this.properties.minValue;
    }

    get maxValue(): number | undefined {
        return this.properties.maxValue;
    }


}