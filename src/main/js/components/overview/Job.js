import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledJob = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`;

const StyledDisplayName = styled.span`
    font-weight: bold;
`;

const StyledStatus = styled.span`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${(props) => getStatusColor(props.status)};
`;

const getStatusColor = (status) => {
    let color;
    switch (status) {
        case "NOT_AVAILABLE":
            color = "#919191";
            break;
        case "SUCCESS":
            color = "#00bd13";
            break;
        case "ERROR":
            color = "#d00008";
            break;
        case "BUILDING":
            color = "#0771d0";
            break;
        default:
            color = "#919191";
    }
    return color;
};

const Job = ({job}) => {
    return (
        <StyledJob>
            <StyledStatus status={job.status}/>
            <StyledDisplayName>{job.displayName}</StyledDisplayName>
            <span>{job.url}</span>
            <span><FontAwesomeIcon icon="server" /></span>
        </StyledJob>
    )
};

export default Job;
