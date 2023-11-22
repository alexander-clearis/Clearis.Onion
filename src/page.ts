import {BindingTypeEnum, ContentDefinition} from "./Client/core/getPage/ContentDefinition";
import {CommunicationProtocolEnum} from "./Client/core/data/CommunicationProtocol";
import {QueryLanguage} from "./Client/core/data/QueryProtocol";
import {SampleProps} from "./Client/ui/public/SampleComponent";

export const page: ContentDefinition = {
    content: {
        "123": {
            componentType: "SampleComponent",
            bindings: {
                sampleValue1: {
                    path: "car1/name",
                }
            }
        }
    },
    context: {
        "car1": {
            communicationProtocol: CommunicationProtocolEnum.REST,
            queryProtocol: QueryLanguage.PRQL,
            end_point: "/car1",
            isList: false
        }
    }
}


