import {h} from 'preact';
import {Component} from "preact";
import {OnionProtoClient} from "../Client/core/OnionProtoClient";
import {PageContext} from "../Client/core/context/PageContext";


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


        return (
            <div id="app">
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
