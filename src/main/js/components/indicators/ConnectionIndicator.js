import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledConnectionIndicator = styled.span`
    border-radius: 50%;
    font-size: 20px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 5px;
    color: white;
    background-color: ${(props) => (props.connected ? "green" : "darkgrey")};
`;

const ConnectionIndicator = ({type, isConnected}) => {
    if (type === "backend") {
        return (
            <StyledConnectionIndicator connected={isConnected}>
                <FontAwesomeIcon icon="server" />
            </StyledConnectionIndicator>)
    }
    return (
        <StyledConnectionIndicator connected={isConnected}>
            <FontAwesomeIcon icon="traffic-light" />
        </StyledConnectionIndicator>
    )
};

export default ConnectionIndicator;