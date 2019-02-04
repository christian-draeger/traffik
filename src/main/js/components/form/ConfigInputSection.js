import React from "react";
import styled from "styled-components";
import Input from "../overview/Input";
import Button from "./Button";
import {connect} from "../../state";

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
    align-items: center;
`;

const StyledForm = styled.form`
    padding: 10px 0;
`;


const ConfigInputSection = ({onStore, overmind}) => {
    return (
        <StyledForm>
            {!overmind.state.addButtonVisible &&
                <FormWrapper>
                    <Input placeholder="Display Name"/>
                    <Input placeholder="Url..."/>
                </FormWrapper>
            }
            <ButtonWrapper>
                <Button type="submit" onStore={onStore} />
            </ButtonWrapper>
        </StyledForm>
    )
};

export default connect(ConfigInputSection);