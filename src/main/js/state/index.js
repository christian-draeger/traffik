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
        history: {
            getJobs() {
                return fetch("/history")
                    .then(response => response.json())
            }
        }
    },
    actions : {
        getJobs: async ({ state, effects }) => {
            state.jobs = await effects.history.getJobs()
        },
        onBackendConnect: ({state}) => {
            state.clientConnected = true;
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