import {BaseComponentProps, ViewController} from "./Component/ViewController";
import {entries, ViewControllerCTOR} from "../util/known_componentfile";
import {PageController} from "./Component/PageController";

import {PageContext} from "./Data/context/PageContext";
import {Content} from "./Component/ContainerController";
import {IDataSource} from "./Data/Source/IDataSource";


export class View {

    public createPage(content: Content): PageController {
        const pc = new PageContext();

        return new PageController(
            pc, {
                discriminator: "",
                content: content
            })

    }

    createControllers(dataSource: IDataSource, content: Content): ViewController[] {
        return Object.keys(content).map(component => {
                let entry = entries[content[component].discriminator];
                return new entry(dataSource, content[component])
            }
        )
    }

}
