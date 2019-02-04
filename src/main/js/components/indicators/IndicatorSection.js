import React from "react";
import styled from "styled-components";
import ConnectionIndicator from "./ConnectionIndicator";

const StyledIndicatorSectionWrapper = styled.div`
    position: absolute;
    right: 0;
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`;

const Indicators = () => {
    return (
        <StyledIndicatorSectionWrapper>
            <ConnectionIndicator type="light"/>
            <ConnectionIndicator type="backend"/>
        </StyledIndicatorSectionWrapper>
    )
};

export default Indicators;