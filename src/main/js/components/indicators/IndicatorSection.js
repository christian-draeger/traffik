import React from "react";
import styled from "styled-components";
import ConnectionIndicator from "./ConnectionIndicator";

const StyledIndicatorSectionWrapper = styled.div`
    position: absolute;
    left: 0;
    width: 8%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    pointer-events: none;
`;

const Indicators = ({backendConnected, trafficLightConnected}) => {
    return (
        <StyledIndicatorSectionWrapper>
            <ConnectionIndicator type="backend" isConnected={backendConnected}/>
            <ConnectionIndicator type="light" isConnected={trafficLightConnected}/>
        </StyledIndicatorSectionWrapper>
    )
};

export default Indicators;