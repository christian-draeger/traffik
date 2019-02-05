import { Overmind } from 'overmind'
import { createConnect } from 'overmind-react'
import {alertError, alertSuccess} from "../components/notifications/Toaster";

export const overmind = new Overmind({
    state: {
        clientConnected: false,
        trafficLightConnected: false,
        jobs: [],
        addButtonVisible: true,
    },
    effects: {
        job: {
            removeJob(jobToRemove) {
                console.log(jobToRemove);
                fetch(`/remove`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jobToRemove)
                }).then(() => console.log("start backend call to remove item", jobToRemove));
            }
        },

    },
    actions : {
        onBackendConnect: ({state}) => {
            state.clientConnected = true;
            fetch("/history")
                .then(response => response.json())
                .then(data => state.jobs = data)
        },
        onBackendDisconnect: ({state}) => {
            alertError("Backend disconnected.");
            state.clientConnected = false;
        },
        onTrafficLightEvent: ({isConnected, state}) => {
            if (isConnected) {
                alertSuccess("USB-Ampel connected.");
                state.trafficLightConnected = true;
            }
            state.trafficLightConnected = false;
        }
    }
});

export const connect = createConnect(overmind);