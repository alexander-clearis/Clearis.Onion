import {h} from 'preact';
import Header from './header';
import {Component} from "preact";
import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {BaseComponentProps} from "../Client/ui/private/base/ViewController";
import {PageContext} from "../Client/data/context/PageContext";
import {MockContext} from "../Client/data/context/DataContext";
import {MockConnector} from "../Client/data/dataExchange/DataExchange";

(window as any).OnionProtoClient = OnionProtoClient;


class App extends Component {
    render() {

        const content = {
            "GarageName": {
                componentType: "SimpleLabel",
                path: "garage/name"
            },
            "GarageAdress": {
                componentType: "SimpleLabel",
                path: "garage/address"
            },

            "SampleInput": {
                componentType: "SimpleInput",
                path: "garage/name"
            },
            "CurrentCarBrand": {
                componentType: "SimpleLabel",
                path: "garage/currentCar/brand"
            },
            "CurrentCarPlate": {
                componentType: "SimpleLabel",
                path: "garage/currentCar/plate"
            },
            "CurrentCarOwner": {
                componentType: "SimpleLabel",
                path: "garage/currentCar/owner/name"
            },

        };

        const pageContext = new PageContext()
        pageContext.add("garage", new MockContext(new MockConnector()))

        return (
            <div id="app">
                <Header/>
                <main>
                    <div class={"fixedhtml"}>
                        {
                            OnionProtoClient.view.createPage(content, pageContext).render()
                        }
                    </div>
                </main>
            </div>
        );
    }
}


export default App;
