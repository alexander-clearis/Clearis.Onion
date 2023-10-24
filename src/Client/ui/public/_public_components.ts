import {BaseComponentProps, ViewController} from "../private/base/ViewController";
import {SimpleController} from "./SimpleController";
import {IDataSource} from "../../core/IDataSource";
import {SimpleInputComponent, SimpleInputController} from "./SimpleInputController";


export type ViewControllerCTOR<T extends ViewController<PropType>, PropType extends BaseComponentProps = T extends ViewController<infer P extends BaseComponentProps> ? P : never> =
    new (dataSource: IDataSource, props: PropType, ...args: any[]) => T;

export const entries: { [key: string]: ViewControllerCTOR<ViewController> } = {
    "SimpleLabel": SimpleController,
    "SimpleInput": SimpleInputController,
}




