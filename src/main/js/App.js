import React, {Component} from "react";
import SockJsClient from 'react-stomp';
import BackendConnection from "./components/indicators/BackEndConnectionIndicator";
import JobResult from "./components/JobResult";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            messages: [],
        }
    }

    onMessageReceive(msg, topic) {
        console.log(`new message received for topic ${topic} - message: ${msg}`);
        this.setState({ messages: msg });
    };

    sendMessage(msg, selfMsg) {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch(e) {
            return false;
        }
    };

    componentWillMount() {
        fetch("/history")
            .then(response => response.json())
            .then((data) => {
                this.setState({ messages: data })
            });
    }

    render() {
        const wsSourceUrl = `${window.location.protocol}//${window.location.host}/handler`;
        return (
            <div>
                <h1>Traffik</h1>
                <BackendConnection isConnected={this.state.clientConnected}/>
                <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
                    onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                    onConnect={ () => { this.setState({ clientConnected: true }) } }
                    onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                    debug={ false }/>
                <ul>
                    {this.state.messages.map(job => <JobResult job={job}/>)}
                </ul>
                <button onClick={() => this.sendMessage({status: "OK"}, {status: "OK"})}>Add</button>
            </div>
        );
    }
}

export default App;