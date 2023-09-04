import {ContextSchema} from "./ConsumerContext";
export class OnionObject {
    readonly ID: string;
    readonly attributes: OnionAttribute[] = []
    readonly references: OnionReference[] = []

    constructor(ID: string) {
        this.ID = ID;
    }


    getAttribute(attributeName: string): OnionAttribute;
    getAttribute(contextAttribute: ContextSchema.Attribute): OnionAttribute;
    getAttribute(attribute: string | ContextSchema.Attribute): OnionAttribute {
        let name;
        if (typeof attribute == "string") {
            name = attribute;
        } else {
            name = attribute.name;
        }
        if (name) {
            return this.attributes.find(a => a.name == name);
        }
        return null;
    }
    getReference(referenceName: string): OnionReference;
    getReference(contextReference: ContextSchema.Attribute): OnionReference;
    getReference(reference: string | ContextSchema.Attribute): OnionReference {
        let name;
        if (typeof reference == "string") {
            name = reference;
        } else {
            name = reference.name;
        }
        if (name) {
            return this.references.find(a => a.name == name);
        }
        return null;
    }

}


abstract class OnionObjectField {
    name: string;
    value: OnionValue;

    constructor(name: string) {
        this.name = name;
    }

    listener() {

    }
    setValue(value: OnionValue) {
        if(value == this.value) {
            return;
        }

        this.value = value

    }

}

class OnionReference extends OnionObjectField {

}

class OnionAttribute extends OnionObjectField {

}

type OnionValue = any;