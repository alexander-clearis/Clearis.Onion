import {h} from 'preact';
import Header from './header';
import {Component} from "react";
import {OnionProtoClient} from "../Client/OnionProtoClient";


class App extends Component {


    render() {
        console.log("test")

        return (
            <div id="app">
                <Header/>
                <main>






                </main>
            </div>
        );
    }
}
(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
