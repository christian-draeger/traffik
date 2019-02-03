import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyledOverviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledAddButton = styled.div`
    padding: 5px;
    width: 50px;
    height: 50px;
    display: flex;
    font-size: 35px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    transition: all .5s ease;
    &:hover {
      background-color: #343434;
      border-bottom: 1px solid #df8800;
      border-radius: 10px;
      color: #df8800;
      cursor: pointer;
    }
`;

const OverviewHeader = ({onAdd}) => {
    return (
        <StyledOverviewHeader>
            <h1>Job Overview</h1>
            <StyledAddButton onClick={() => onAdd({
                type: "CREATE",
                job: {
                    displayName: "display Name",
                    url: "http://google.de"
                }
            })}>
                <FontAwesomeIcon icon="plus"/>
            </StyledAddButton>
        </StyledOverviewHeader>
    )
};

export default OverviewHeader;