

export interface ContextConsumerSchema {
    //context variable
    [index: string]: ConsumerPartialSchema
}

export interface ConsumerPartialSchema {
    attributes: ConsumerAttribute[];
    references: [string, ConsumerPartialSchema][]
}

export type ConsumerAttribute = string;