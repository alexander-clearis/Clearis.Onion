import {h} from 'preact';
import Header from './header';
import {Component} from "preact";
import {OnionProtoClient} from "../Client/OnionProtoClient";
import {BaseComponentProps} from "../Client/Component/ViewController";


class App extends Component {
    render() {

        return (
            <div id="app">
                <Header/>
                <main>

                    <div class={"fixedhtml"}>
                        {
                            OnionProtoClient.view.createPage({
                                "123456": {
                                    discriminator: "SimpleController",
                                    caption: "thisIsApath"
                                } as BaseComponentProps
                            })
                        }

                    </div>


                </main>
            </div>
        );
    }
}


(window as any).ClearisProtoClient = OnionProtoClient;
export default App;
