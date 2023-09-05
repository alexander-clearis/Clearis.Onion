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

                    <div>

                        {
                            new OnionContainer("asdasf", {
                                children: {
                                    "newkey": {
                                        component_id: "OnionLabelController",
                                        props: {
                                            data: "asdfasdfasdfasdf"
                                        }
                                    }
                                }
                            },).render()}


                    </div>


                </main>
            </div>
        );
    }
}


(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
