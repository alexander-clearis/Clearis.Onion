import {h} from 'preact';
import Header from './header';
import {Component} from "react";
import {OnionProtoClient} from "../Client/OnionProtoClient";
import {OnionController} from "./base/OnionComponent";
import {OnionContainer} from "./containers/OnionContainer";
import {OnionLabelController} from "./label/OnionLabelController";


class App extends Component {

    render() {

        return (
            <div id="app">
                <Header/>
                <main>

                    <div class={"fixedhtml"}>
                        {
                            OnionProtoClient.view.createComponents(undefined,
                                {
                                    "key1": {

                                        component_id: "OnionContainer",
                                        props: {
                                            children: {
                                                "key2":  {
                                                    component_id: "OnionLabelController",
                                                    props:  {
                                                        data: "Dit is test data"
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }).map(value => value.render())
                        }

                    </div>


                </main>
            </div>
        );
    }
}


(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
