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
            addButtonVisible: true,
        }
    }

    onBackendConnect = () => {
        this.setState({ clientConnected: true });
    };

    onBackendDisconnect = () => {
        this.setState({ clientConnected: false });
        alertError("Backend Disconnected");
    };

    onAdd = () => {
        this.setState({ addButtonVisible: false })
    };

    onMessageReceive = (msg, topic) => {
        if (topic === "/topic/trafficlight") {
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
            this.setState({ addButtonVisible: true });
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
                <SockJsClient url={ wsSourceUrl } topics={["/topic/all", "/topic/trafficlight"]}
                    onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                    onConnect={ this.onBackendConnect }
                    onDisconnect={ this.onBackendDisconnect }
                    debug={ false }/>

                <Indicators
                    backendConnected={this.state.clientConnected}
                    trafficLightConnected={this.state.trafficLightConnected}
                />
                <JobOverview
                    jobs={this.state.jobs}
                    onAdd={this.onAdd}
                    onStore={this.sendMessage}
                    addButtonVisible={this.state.addButtonVisible}
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
