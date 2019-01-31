import React from "react";
import styled from "styled-components";

const StyledConnectionIndicator = styled.span`
    border-radius: 50%;
    font-size: 16px;
    padding: 5px;
    margin: 5px;
    color: white;
    background-color: ${(props) => (props.connected ? "green" : "darkgrey")};
`;

const ConnectionIndicator = ({type, isConnected}) => {
    if (type === "backend") {
        return <StyledConnectionIndicator connected={isConnected}>B</StyledConnectionIndicator>
    }
    return <StyledConnectionIndicator connected={isConnected}>T</StyledConnectionIndicator>
};

export default ConnectionIndicator;