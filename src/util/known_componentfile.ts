import {BaseComponentProps, ViewController} from "../Client/Component/ViewController";
import {SimpleController} from "../components/Basic/SimpleController";
import {IDataSource} from "../Client/Data/Source/IDataSource";


export type ViewControllerCTOR<T extends ViewController<PropType>, PropType extends BaseComponentProps = T extends ViewController<infer P extends BaseComponentProps> ? P : never> =
    new (dataSource: IDataSource, props: PropType, ...args: any[]) => T;

export const entries: { [key: string]: ViewControllerCTOR<ViewController> } = {
    "SimpleController": SimpleController,
}




