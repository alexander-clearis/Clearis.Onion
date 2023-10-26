import './style/index.css';
import App from './Components/app';
import {OnionProtoClient} from "./Client/core/OnionProtoClient";

(window as any).OnionProtoClient = OnionProtoClient;

export default App;




