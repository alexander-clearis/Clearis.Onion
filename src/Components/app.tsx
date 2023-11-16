import {ComponentChild, h, RenderableProps, VNode} from 'preact';
import {Component} from "preact";

import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {ContentController, ContentWrapperComponent} from "../Client/ui/private/page/ContentWrapperComponent";
import React from 'preact/compat';

interface AppState extends show {
    windowLocation: string;
    contentController: ContentController;
}

interface show {
    show: boolean
}

interface switcher extends Component {
    getStateString(): string;
}

export class HARDSWITCHER extends Component<show, show> implements switcher {
    constructor(props: show, context: any) {
        console.log("hardSwitch constructed")
        super(props, context);
        this.state = props
    }

    changeState(value: boolean) {
        this.setState({show: value})
    }


    componentDidMount() {
        console.log("hardSwitch did mount")
    }

    componentWillUnmount() {
        console.log("hardSwitch did un mount")

    }

    render(props?: RenderableProps<any>, state?: Readonly<any>, context?: any): ComponentChild {
        return this.props.show ? <div> Joe joe </div> : null
    }

    getStateString(): string {
        return `hardSwitch show state = ${this.props.show}`
    };
}

export class CSS_SWITCHER extends Component<show, show> implements switcher {
    componentDidMount() {
        console.log("css_switch did mount")
    }

    componentWillUnmount() {
        console.log("css_switch did un mount")
    }

    constructor(props: show, context: any) {
        console.log("css_switch constructed")
        super(props, context);
        this.state = props
    }

    changeState(value: boolean) {
        this.setState({show: value})
    }

    public getStateString(): string {
        return `css_switch show state = ${this.props.show}`
    };

    render(props?: RenderableProps<any>, state?: Readonly<any>, context?: any): ComponentChild {
        return <div onClick={() => console.log(this.getStateString(), (this.props.show ? "block" : "none"))}
                    style={{display: this.props.show ? "block" : "none"}}> Joe joe </div>
    }
}


class App extends Component<{}, AppState> {

    constructor() {
        super();
        this.state = {...this.state, show: true}
        this.setWindowLocation(window.location.href)
        this.content_byCTOR.push(new CSS_SWITCHER({
            show: true
        }, undefined))
    }

    public content_byCTOR: CSS_SWITCHER [] = [];

    setWindowLocation(location: string) {

        OnionProtoClient.view.getPageController(location).then(contentController => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    windowLocation: location,
                    contentController: contentController
                }
            })
        });
    }


    render() {

        return (
            <div id="app">
                <main>
                    <div class={"fixedhtml"}>
                        {
                            window.location.href

                        }
                        <button onClick={() => {
                        }
                        }> Click me
                        </button>

                        <div>


                        </div>
                        <div style={{background: "yellow"}}>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


export default App;
