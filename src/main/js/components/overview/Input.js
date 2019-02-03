import React, {Component} from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
    position: relative;
    flex: 1;
    justify-content: flex-end;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    padding: 5px;
    background-color: #343434;
    color: #ccc;
    width: 100%;
    &:focus {
        outline: none;
        + span {
            width: 100%;
            transition: 0.4s;
            left: 0;
        }
    }

    + span {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 1px;
        background-color: #df8800;
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
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={(event) => this.handleChange(event)}
                />
                <span />
            </StyledInputWrapper>
        )
    }
}

export default Input;