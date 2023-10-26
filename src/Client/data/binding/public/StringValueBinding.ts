import {AbstractValueBinding, InputValueBinding} from "../private/ValueBinding";
import {ValueProperties} from "./ValueBindingProps";
import DisplayValueProperties = ValueProperties.String.DisplayValueProperties;
import InputValueProperties = ValueProperties.String.InputValueProperties;
import {ValueUtils} from "../../values/ValueUtils";
import applyCaseTransform = ValueUtils.String.applyCaseTransform;
import matchesRegex = ValueUtils.String.matchesRegex;
import applyRegexReplace = ValueUtils.String.applyRegexReplace;
import RegexType = ValueUtils.String.RegexType;


export class StringValueBinding<VProperties extends DisplayValueProperties = DisplayValueProperties> extends AbstractValueBinding<string, VProperties> {

    getFormatted(): string | undefined {
        throw new Error("This method has not been implemented")
    }
}

export class StringInputValueBinding extends StringValueBinding<InputValueProperties> implements InputValueBinding<string, InputValueProperties> {
    set(value: string): void {
        // apply Case transform
        if (this.properties.caseTransform) {
            value = applyCaseTransform(value, this.properties.caseTransform);
        }
        // is valid to regex
        if (!this.regex || matchesRegex(value, this.properties.regex)) {
            // apply regex replace
            if (this.properties.regexReplace) {
                value = applyRegexReplace(value, this.properties.regexReplace);
            }
            //check min max value
            if (this.minValue && value.length >= this.minValue) {
                if (this.maxValue && value.length <= this.maxValue) {
                    this.setValue(value);
                }
            }
        }

    }

    isValid(value: string): boolean {
        throw new Error("This method has not been implemented");
    }

    isRequired(): boolean {
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

