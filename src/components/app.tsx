import {h} from 'preact';
import Header from './header';
import {Component} from "react";
import {OnionProtoClient} from "../Client/OnionProtoClient";
import {OnionController} from "./base/OnionComponent";
import {OnionContainer} from "./containers/OnionContainer";


class App extends Component {


    render() {
        console.log("test")

        return (
            <div id="app">
                <Header/>
                <main>
                    {/*{*/}
                    {/*    //todo: fix  createComonents*/}
                    {/*    OnionProtoClient.view.createComponents(undefined, {*/}
                    {/*        //json from getPage...*/}


                    {/*    })*/}
                    {/*}*/}

                    <div>

                        {new OnionContainer("asdasf", {class: "red"}, {}).render()}


                    </div>


                </main>
            </div>
        );
    }
}

(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
