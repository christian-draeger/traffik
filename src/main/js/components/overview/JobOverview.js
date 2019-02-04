import React, {Fragment} from "react";
import Job from "./Job";
import ConfigInputSection from "../form/ConfigInputSection";
import styled from "styled-components";
import {connect} from "../../state";

const H1 = styled.h1`
    text-align: center;
`;

const JobOverview = ({onStore, overmind}) => {
    return (
        <Fragment>
            <H1>Job Overview</H1>
            {overmind.state.jobs.map((job, index) => <Job job={job} key={index}/>)}
            <ConfigInputSection onStore={onStore}/>
        </Fragment>
    )
};

export default connect(JobOverview);