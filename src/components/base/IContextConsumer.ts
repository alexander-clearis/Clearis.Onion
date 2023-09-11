import {ContextSchema} from "../../Client/ConsumerContext";
import {BaseType, Value} from "../../Client/IValue";

export interface ContextConsumerPath {
    path: string;
    onChange: (value: Value<BaseType>) => void

}

export interface IContextConsumer {
    getContextPaths(): ContextConsumerPath[];

}


export class ContextBinding {
    private path: string;
    private valueBinding: Value<BaseType>
    private pathBindings: Value<BaseType>[] = [];
    private consumer: IContextConsumer;

    private onChangeInPath = () =>{

    }

    private onValueChange: (value: Value<BaseType>) => void;

    destroy() {
        //remove from context
        // remove from value,
            // remove from path binding

    }
}

