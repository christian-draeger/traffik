import React from "react";
import styled from "styled-components";
import Job from "./Job";

const StyledJobOverview = styled.div`
    padding: 5px;
    width: 100%;
`;

const JobOverview = ({jobs, onAdd}) => {
    return (
        <StyledJobOverview>
            <h1>Job Overview</h1>
            {jobs.map(job => <Job job={job}/>)}
            <button onClick={() => onAdd({
                displayName: "display Name",
                url: "http://google.de",
                status: "NOT_AVAILABLE"
            })}>Add</button>
        </StyledJobOverview>
    )
};

export default JobOverview;