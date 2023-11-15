import {BaseComponentProps, ViewController} from "../private/base/ViewController";
import {SimpleController, SimpleProps} from "./SimpleController";
import {IDataSource} from "../../core/IDataSource";
import {SimpleInputComponent, SimpleInputController} from "./SimpleInputController";
import * as path from "path";


//
// export type _ViewControllerCTOR<T extends ViewController<PropType>, PropType extends BaseComponentProps = T extends ViewController<infer P extends BaseComponentProps> ? P : never> =
//     new (dataSource: IDataSource, props: PropType, ...args: any[]) => T;
//
//
// export const _entries: { [key: string]: _ViewControllerCTOR<ViewController> } = {
//     "SimpleLabel": SimpleController,
//     "SimpleInput": SimpleInputController,
// }
//


export type ViewControllerCTOR<T extends ViewController = ViewController, PropType extends BaseComponentProps = BaseComponentProps> =
    new (dataSource: IDataSource, ...args: any[]) => SimpleController;


export const entries: { [key: string]: ViewControllerCTOR } = {
    "SimpleLabel": SimpleController,
    "SimpleInput": SimpleInputController,
}

