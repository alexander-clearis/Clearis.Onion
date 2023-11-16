import {h} from 'preact';
import {Component} from "preact";

import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {ContentController} from "../Client/ui/private/page/ContentController";

interface AppState {
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
            this.setState({
                windowLocation: location,
                contentController
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
                    </div>
                </main>
            </div>
        );
    }
}


export default App;
