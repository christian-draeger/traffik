import React from "react";
import styled from "styled-components";
import ConnectionIndicator from "./ConnectionIndicator";

const StyledIndicatorSectionWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    text-align: right;
`;

const StyledIndicatorSection = styled.div`
    position: relative;
    padding: 15px;
`;

const Indicators = ({backendConnected, trafficLightConnected}) => {
    return (
        <StyledIndicatorSectionWrapper>
            <StyledIndicatorSection>
                <ConnectionIndicator type="backend" isConnected={backendConnected}/>
                <ConnectionIndicator type="light" isConnected={trafficLightConnected}/>
            </StyledIndicatorSection>
        </StyledIndicatorSectionWrapper>
    )
};

export default Indicators;