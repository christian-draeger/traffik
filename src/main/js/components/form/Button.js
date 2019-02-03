import styled from "styled-components";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

const Button = ({onAdd, onStore, addButtonVisible}) => {
    if (addButtonVisible) {
        return (
            <StyledAddButton onClick={onAdd}>
                <FontAwesomeIcon icon="plus"/>
            </StyledAddButton>
        )
    }
    return (
        <StyledAddButton onClick={() => onStore({
            type: "CREATE",
            job: {
                displayName: "display Name",
                url: "http://google.de"
            }
        })}>
            <FontAwesomeIcon icon="save"/>
        </StyledAddButton>
    )
};

export default Button;