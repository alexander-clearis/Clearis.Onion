import {ValueBindingPropSpaces} from "./ValueBindingProps";
import ListDisplayValueProperties = ValueBindingPropSpaces.ListDisplayValueProperties;
import {AbstractValueBinding} from "../private/ValueBinding";
import {GlobalValueType, PropertyValueType, ValueSet} from "../../values/GlobalValueType";

export class ListValueBinding<Type extends PropertyValueType = PropertyValueType, VProperties extends ListDisplayValueProperties = ListDisplayValueProperties> extends AbstractValueBinding<ValueSet<Type>, VProperties> {
    getFormatted(): string | undefined {
        return undefined;
    }


}

