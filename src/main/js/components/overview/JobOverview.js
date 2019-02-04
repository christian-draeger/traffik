import React, {Fragment} from "react";
import Job from "./Job";
import ConfigInputSection from "../form/ConfigInputSection";
import styled from "styled-components";

const H1 = styled.h1`
    text-align: center;
`;

const JobOverview = ({jobs, onStore}) => {
    return (
        <Fragment>
            <H1>Job Overview</H1>
            {jobs.map((job, index) => <Job job={job} key={index}/>)}
            <ConfigInputSection onStore={onStore}/>
        </Fragment>
    )
};

export default JobOverview;