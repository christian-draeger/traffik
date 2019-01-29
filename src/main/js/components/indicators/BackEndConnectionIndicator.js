import React from "react";

const BackendConnection = ({isConnected}) => {
    if (isConnected) {
        return (
            <p>Backend Connected</p>
        )
    }
    return (
        <p>Backend Disconnected</p>
    )
};

export default BackendConnection;