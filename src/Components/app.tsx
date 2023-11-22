import {ComponentChild, h, RenderableProps, VNode} from 'preact';
import {Component} from "preact";

import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {ContentController, ContentWrapperComponent} from "../Client/ui/private/page/ContentWrapperComponent";
import React from 'preact/compat';
import {page2} from "../page";

interface AppState {
    windowLocation: string;
    contentController: ContentController;
}

class App extends Component<{}, AppState> {

    constructor() {
        super();
        OnionProtoClient.view.bindApp(this);
    }

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
                            this.state.windowLocation
                        }

                        <a href={"/plate"}> Click me</a>

                        <div>


                        </div>
                        <div style={{background: "yellow"}}>
                            {
                                this.state.contentController?.getWrapperComponent()
                            }
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


export default App;
