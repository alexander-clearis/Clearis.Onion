import {Component, ComponentChild, h, RenderableProps} from "preact";
import {iDatasource} from "../../../core/IDatasource";
import {BindingProperties, BindingTypeEnum, ComponentFactoryProps} from "../../../core/getPage/ContentDefinition";
import {
    BindingRecordBaseType,
    BindingSubscriptionReturnType,
    BindingSubscriptionStore
} from "../../../data/binding/public/BindingTypings";
import {GlobalValueType} from "../../../data/values/GlobalValueType";
import {StringValueBinding} from "../../../data/binding/public/StringValueBinding";
import {AbstractValueBinding} from "../../../data/binding/private/ValueBinding";


export interface BaseComponentProps<BindingMap extends BindingRecordBaseType = {}> extends ComponentFactoryProps<BindingMap> {
    contextSource: iDatasource

}

export interface BasicComponentState {
    thisIsABaseComponentStateProp: string
}

export abstract class BasicViewComponent<BindingMap extends BindingRecordBaseType, Props extends BaseComponentProps<BindingMap>, State extends BasicComponentState = BasicComponentState> extends Component<Props, State> {


    protected bindings: BindingMap
    private bindingSubscriptions?: BindingSubscriptionStore;

    constructor(props: Props) {
        super(props, undefined);
        this.bindings = this.initBindings();

    }

    protected abstract initBindings(): BindingMap;


    componentDidMount() {
        this.subscribeToBindings();
    }

    componentWillUnmount() {
        this.unsubscribeBindings()
    }

    subscribeToBindings() {
        for (let bindingKey in this.bindings) {
            let binding = this.bindings[bindingKey] as AbstractValueBinding;
            this.addSubscription(binding.subscribe(value => {
                this.forceUpdate()
            }))
        }
    }

    protected addSubscription(registration: BindingSubscriptionReturnType) {
        this.bindingSubscriptions?.push(registration)
    }

    private unsubscribeBindings() {
        this.bindingSubscriptions?.forEach(bindingSubscription => {
            bindingSubscription[0].unsubscribe(bindingSubscription[1]);
        })
    }

    abstract getRetrievalSchema(): void;

    abstract render(): ComponentChild;

    abstract render(props?: RenderableProps<Props>, state?: Readonly<State>, context?: any): ComponentChild
}



