import React from "react";
import styled from "styled-components";
import BackendConnection from "./BackEndConnectionIndicator";
import TrafficLightConnection from "./TrafficLightConnectionIndicator";

const StyledIndicatorSectionWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const StyledIndicatorSection = styled.div`
    position: relative;
    width: 100%;
`;

const Indicators = ({backendConnected, trafficLightConnected}) => {
    return (
        <StyledIndicatorSectionWrapper>
            <StyledIndicatorSection>
                <BackendConnection isConnected={backendConnected}/>
                <TrafficLightConnection isConnected={trafficLightConnected}/>
            </StyledIndicatorSection>
        </StyledIndicatorSectionWrapper>
    )
};

export default Indicators;