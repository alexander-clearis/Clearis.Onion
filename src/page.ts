import {BindingTypeEnum, Content, ContentDefinition} from "./Client/core/getPage/ContentDefinition";
import {CommunicationProtocolEnum} from "./Client/core/data/CommunicationProtocol";
import {QueryLanguage} from "./Client/core/data/QueryProtocol";
import {SampleProps} from "./Client/ui/public/SampleComponent";
import {ListComponentProps} from "./Client/ui/private/list/ListComponent";

export const page: ContentDefinition = {
    content: {
        "2": {
            componentType: "ListComponent",
            iterator: {
                path: "cars",
            },
            content: {
                "1": {
                    componentType: "SampleComponent",
                    bindings: {
                        sampleValue1: {
                            path: "brand",
                        }
                    }
                } as SampleProps,
                "2": {
                    componentType: "SampleComponent",
                    bindings: {
                        sampleValue1: {
                            path: "plate",
                        }
                    }
                } as SampleProps
            } as Content
        } as ListComponentProps
    },
    context: {
        "cars": {
            communicationProtocol: CommunicationProtocolEnum.REST,
            queryProtocol: QueryLanguage.PRQL,
            end_point: "/cars",
            isList: true
        }
    }
}


export const page2: ContentDefinition = {
    content: {
        "615847": {
            componentType: "SampleComponent",
            bindings: {
                sampleValue1: {
                    path: "car1/plate",
                }
            }
        },
        "6188186": {
            componentType: "SampleComponent",
            bindings: {
                sampleValue1: {
                    path: "car1/brand",
                }
            }
        },
    },
    context: {
        "car1": {
            communicationProtocol: CommunicationProtocolEnum.REST,
            queryProtocol: QueryLanguage.PRQL,
            end_point: "/car1",
            isList: false
        },
        "garage": {
            communicationProtocol: CommunicationProtocolEnum.REST,
            queryProtocol: QueryLanguage.PRQL,
            end_point: "/garage",
            isList: false
        }
    }
}

