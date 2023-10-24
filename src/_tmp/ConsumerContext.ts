

export namespace ContextSchema {
    interface IContextConsumer {};

    export class Field {
        readonly name: string;
        readonly used_by: IContextConsumer[] = []

        constructor(name: string, consumer: IContextConsumer) {
            this.name = name;
            this.used_by.push(consumer)
        }


        public static merge(field: Field, consumer: IContextConsumer) {

            const found = field.used_by.find(exisiting => exisiting == consumer);
            if (!found) {
                field.used_by.push(consumer)
            }
        }


        static create(name: string, consumer: IContextConsumer): Field {
            return new Field(name, consumer)
        }
    }

    export class Attribute extends Field {
        constructor(name: string, consumer: IContextConsumer) {
            super(name, consumer);
        }

        public static merge(existing: Attribute, consumer: IContextConsumer, incoming_attributes?: Attribute[])
        public static merge(existing: Attribute[], consumer: IContextConsumer, incoming_attributes?: Attribute[])

        public static merge(existing: Attribute | Attribute[], consumer: IContextConsumer, incoming_attributes?: Attribute[]) {
            if (!incoming_attributes || incoming_attributes.length < 0) {
                return
            }

            function _merge(existing: Attribute, consumer: IContextConsumer) {
                Field.merge(existing, consumer);
            }

            if (existing instanceof Array) {
                incoming_attributes.forEach(incoming_attribute => {
                    let found = existing.find(existing_attribute => existing_attribute.name == incoming_attribute.name);
                    if (found) {
                        _merge(found, consumer);
                    } else {
                        existing.push(incoming_attribute)
                    }
                })
            } else {
                _merge(existing, consumer)
            }
        }

        static create(name: string, consumer: IContextConsumer): Attribute
        static create(name: string[], consumer: IContextConsumer): Attribute[]
        static create(name: string | string[], consumer: IContextConsumer): Attribute | Attribute[] {
            if (typeof name == "string") {
                return new Attribute(name, consumer)
            } else {
                return name.map(n => new Attribute(n, consumer))
            }
        }
    }

    export class ContextElement extends Field {
        attributes: Attribute[]
        references: ContextElement[]

        protected constructor(name: string, consumer: IContextConsumer, attributes: Attribute[], references: ContextElement[]) {
            super(name, consumer);
            this.attributes = attributes;
            this.references = references
        }

        public static create(name: string, consumer: IContextConsumer, attributes?: Attribute[], references?: ContextElement[]): ContextElement {
            return new ContextElement(name, consumer, attributes ?? [], references ?? []);
        }

        static merge(existing: ContextElement, consumer: IContextConsumer, incoming_references?: ContextElement[], incoming_attributes?: Attribute[])

        static merge(existing: ContextElement [], consumer: IContextConsumer, incoming_references?: ContextElement[])

        static merge(existing: ContextElement | ContextElement[], consumer: IContextConsumer, incoming_references?: ContextElement[], incoming_attributes?: Attribute[]) {
            function _merge(existing: ContextElement, consumer: IContextConsumer, incoming_attributes?: Attribute[], incoming_references?: ContextElement[]) {
                Field.merge(existing, consumer);
                Attribute.merge(existing.attributes, consumer, incoming_attributes)
                ContextElement.merge(existing.references, consumer, incoming_references)
            }

            if (existing instanceof Array) {
                incoming_references.forEach(incoming_reference => {
                    let found = existing.find(existing_reference => existing_reference.name == incoming_reference.name);
                    if (found) {
                        _merge(found, consumer, incoming_reference.attributes, incoming_reference.references)
                    }
                })
            } else {
                _merge(existing, consumer, incoming_attributes ?? [], incoming_references ?? [])
            }
        }
    }

    export class Schema {
        readonly used_by: IContextConsumer[] = []
        readonly name: string
        readonly contextElement: ContextElement;
        readonly isList: boolean;


        constructor(name: string, consumer: IContextConsumer, contextElement: ContextElement, isList: boolean) {
            this.name = name
            this.used_by.push(consumer);
            this.contextElement = contextElement;
            this.isList = isList;
        }

        merge(incoming: Schema) {
            incoming.used_by.forEach(consumer => {
                const found = this.used_by.find(exisiting => exisiting == consumer);
                if (!found) {
                    this.used_by.push(consumer)
                }
            })

        }
    }


}