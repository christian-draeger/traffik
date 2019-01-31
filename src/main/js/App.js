import React, {Component} from "react";
import SockJsClient from 'react-stomp';
import 'react-toastify/dist/ReactToastify.min.css';
import JobResult from "./components/JobResult";
import Indicators from "./components/indicators/IndicatorSection";
import FontawesomeAdapter from "./FontawesomeAdapter";
import {ToastContainer} from "react-toastify";

class App extends Component {

    constructor(props) {
        super(props);
        new FontawesomeAdapter();
        this.state = {
            clientConnected: false,
            trafficLightConnected: false,
            jobs: [],
        }
    }

    onMessageReceive = (msg, topic) => {
        console.log(`new message received for topic "${topic}" - message: ${msg}`);
        if (topic === "/topic/trafficlight") {
            this.setState({ trafficLightConnected: msg });
        }
        if (topic === "/topic/all") {
            this.setState(prevState => ({ jobs: [...prevState.jobs, msg] }));
        }
    };

    sendMessage = (msg) => {
        try {
            this.clientRef.sendMessage("/traffik/all", JSON.stringify(msg));
            return true;
        } catch(e) {
            return false;
        }
    };

    componentWillMount() {
        fetch("/history")
            .then(response => response.json())
            .then((data) => {
                this.setState({ jobs: data })
            });
    }

    render() {
        const wsSourceUrl = `${window.location.protocol}//${window.location.host}/handler`;
        return (
            <div>
                <h1>Traffik</h1>
                <SockJsClient url={ wsSourceUrl } topics={["/topic/all", "/topic/trafficlight"]}
                    onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                    onConnect={ () => { this.setState({ clientConnected: true }) } }
                    onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                    debug={ false }/>
                <ul>
                    {this.state.jobs.map(job => <JobResult job={job}/>)}
                </ul>
                <button onClick={() => this.sendMessage({status: "OK"})}>Add</button>
                <Indicators
                    backendConnected={this.state.clientConnected}
                    trafficLightConnected={this.state.trafficLightConnected}
                />
                <ToastContainer />
            </div>
        );
    }
}

export default App;