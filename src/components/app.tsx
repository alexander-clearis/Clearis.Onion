import {h} from 'preact';
import Header from './header';
import {Component} from "react";
import {OnionProtoClient} from "../Client/OnionProtoClient";
import {OnionController} from "./base/OnionComponent";
import {Container} from "./containers/Container";
import {OnionLabelController} from "./label/OnionLabelController";
import {entries} from "../util/known_componentfile";


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

                    <button onClick={() => console.log(entries)}>


                    </button>
                </main>
            </div>
        );
    }
}


(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
