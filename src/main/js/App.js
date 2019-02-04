import React, {Component} from "react";
import SockJsClient from 'react-stomp';
import JobOverview from "./components/overview/JobOverview";
import Indicators from "./components/indicators/IndicatorSection";
import FontawesomeAdapter from "./FontawesomeAdapter";
import Toaster, {alertError, alertSuccess} from "./components/notifications/Toaster";
import styled from "styled-components";
import {connect} from "./state";

class App extends Component {

    constructor(props) {
        super(props);
        new FontawesomeAdapter();
    }

    onMessageReceive = (msg, topic) => {
        const { actions, state } = this.props.overmind;
        if (topic === "/topic/trafficlight") {
            actions.onTrafficLightEvent(msg)
        }
        if (topic === "/topic/all") {
            state.jobs.push(msg);
            alertSuccess("Job successfully added.");
        }
    };

    sendMessage = (msg) => {
        const { state } = this.props.overmind;
        try {
            this.clientRef.sendMessage("/traffik/all", JSON.stringify(msg));
            state.addButtonVisible = true;
            return true;
        } catch(e) {
            return false;
        }
    };

    componentDidCatch(error, errorInfo) {
        alertError("Something went wrong.");
        console.log(`error: ${error} \n ${errorInfo}`);
    }

    componentDidMount() {
        const { actions, state } = this.props.overmind;
        actions.getHistory(state);
    }

    render() {
        const { actions } = this.props.overmind;
        const wsSourceUrl = `${window.location.protocol}//${window.location.host}/handler`;
        return (
            <AppWrapper>
                <SockJsClient url={ wsSourceUrl } topics={["/topic/all", "/topic/trafficlight"]}
                    onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                    onConnect={ actions.onBackendConnect }
                    onDisconnect={ actions.onBackendDisconnect }
                    debug={ false }/>

                <Indicators/>
                <JobOverview onStore={this.sendMessage} />
                <Toaster/>
            </AppWrapper>
        );
    }
}

export default connect(App);

const AppWrapper = styled.div`
    margin: auto;
    width: 80%;
    max-width: 800px;
`;
