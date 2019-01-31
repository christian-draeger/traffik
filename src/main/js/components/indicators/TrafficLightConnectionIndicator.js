import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.span`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);

    background: transparent;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
`;

const TrafficLightConnection = ({isConnected}) => {
    if (isConnected) {
        return (
            <p>Traffic-Light Connected</p>
        )
    }
    return (
        <p>Traffic-Light Disconnected</p>
    )
};

export default TrafficLightConnection;