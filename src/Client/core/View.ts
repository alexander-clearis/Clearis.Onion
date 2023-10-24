import {BaseComponentProps, ViewController} from "../ui/private/base/ViewController";
import {entries, ViewControllerCTOR} from "../ui/public/_public_components";
import {PageController} from "../ui/private/page/PageController";

import {PageContext} from "../data/context/PageContext";
import {Content} from "../ui/private/container/ContainerController";
import {IDataSource} from "./IDataSource";
import {MockContext} from "../data/context/DataContext";
import {MockConnector} from "../data/dataExchange/DataExchange";


export class View {

    public createPage(content: Content, pageContext?: PageContext): PageController {
        if (!pageContext) {
            pageContext = new PageContext()
        }



        return new PageController(
            pageContext, {
                componentType: "",
                content: content
            })

    }

    createControllers(dataSource: IDataSource, content: Content): ViewController[] {
        return Object.keys(content).map(component => {
                let entry = entries[content[component].componentType];
                return new entry(dataSource, content[component])
            }
        )
    }
}
