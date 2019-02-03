import React, {Component} from "react";
import SockJsClient from 'react-stomp';
import JobOverview from "./components/overview/JobOverview";
import Indicators from "./components/indicators/IndicatorSection";
import FontawesomeAdapter from "./FontawesomeAdapter";
import Toaster, {alertError, alertSuccess} from "./components/notifications/Toaster";
import styled from "styled-components";

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

    onBackendConnect = () => {
        this.setState({ clientConnected: true });
    };

    onBackendDisconnect = () => {
        this.setState({ clientConnected: false });
        alertError("Backend Disconnected");
    };

    onMessageReceive = (msg, topic) => {
        console.log(`new message received for topic "${topic}"`);
        if (topic === "/topic/trafficlight") {
            console.log(`traffic-light message was: ${msg}`);
            this.setState({ trafficLightConnected: msg });
        }
        if (topic === "/topic/all") {
            this.setState(prevState => ({ jobs: [...prevState.jobs, msg] }));
            alertSuccess("Job successfully added.");
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

    componentDidCatch(error, errorInfo) {
        console.log(`error: ${error} \n ${errorInfo}`);
        alertError("Something went wrong.");
    }

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
            <AppWrapper>
                <h1>Traffik</h1>
                <SockJsClient url={ wsSourceUrl } topics={["/topic/all", "/topic/trafficlight"]}
                    onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                    onConnect={ this.onBackendConnect }
                    onDisconnect={ this.onBackendDisconnect }
                    debug={ false }/>

                <JobOverview jobs={this.state.jobs} onAdd={this.sendMessage}/>

                <Indicators
                    backendConnected={this.state.clientConnected}
                    trafficLightConnected={this.state.trafficLightConnected}
                />
                <Toaster/>
            </AppWrapper>
        );
    }
}

export default App;

const AppWrapper = styled.div`
    margin: auto;
    width: 80%;
    max-width: 800px;
`;
