import {ComponentChild, h, RenderableProps, VNode} from 'preact';
import {Component} from "preact";

import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {ContentController, ContentWrapperComponent} from "../Client/ui/private/page/ContentWrapperComponent";
import React from 'preact/compat';

interface AppState  {
    windowLocation: string;
    contentController: ContentController;
}

class App extends Component<{}, AppState> {

    constructor() {
        super();
        this.setWindowLocation(window.location.href)
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
                            window.location.href

                        }
                        <button onClick={() => {
                        }
                        }> Click me
                        </button>

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
