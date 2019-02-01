import React, {Component} from "react";
import styled from "styled-components";

const inputWidth = 250;

const StyledInputWrapper = styled.div`
    position: relative;
    flex: 1;
    justify-content: flex-start;
    width: ${inputWidth + "px"};
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    padding: 15px;
    width: ${inputWidth + "px"};
    &:focus {
        outline: none;
        + span {
            width: ${inputWidth + "px"};
            transition: 0.4s;
            left: 0;
        }
    }

    + span {
        position: absolute;
        bottom: 0;
        left: ${inputWidth / 2 + "px"};
        width: 0;
        height: 6px;
        background-color: #f60;
        transition: 0.4s;
    }
`;

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <StyledInputWrapper>
                <StyledInput
                    autoComplete="off"
                    spellCheck={false}
                    type="text"
                    placeholder="Url..."
                    value={this.state.value}
                    onChange={(event) => this.handleChange(event)}
                />
                <span />
            </StyledInputWrapper>
        )
    }
}

export default Input;