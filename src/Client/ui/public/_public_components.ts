import {BaseComponentProps, BasicViewController} from "../private/base/BasicViewController";
import {IDataSource} from "../../core/IDataSource";


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


export type ViewControllerCTOR<T extends BasicViewController = BasicViewController, PropType extends BaseComponentProps = BaseComponentProps> =
    new (dataSource: IDataSource, ...args: any[]) => BasicViewController;


export const entries: { [key: string]: ViewControllerCTOR } = {

}

