import {ContentDefinition} from "./Client/core/getPage/ContentDefinition";
import {CommunicationProtocolEnum} from "./Client/core/data/CommunicationProtocol";
import {QueryLanguage} from "./Client/core/data/QueryProtocol";
import {ComponentFactoryProps} from "./Client/ui/private/base/BasicViewController";

export const page: ContentDefinition = {
    content: {
        "123": {
            componentType: "SampleComponent",
            value: "car1/name",
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