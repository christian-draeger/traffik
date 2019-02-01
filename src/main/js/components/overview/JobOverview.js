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
            {jobs.map(job => <Job job={job}/>)}
            <button onClick={() => onAdd({status: "OK"})}>Add</button>
        </StyledJobOverview>
    )
};

export default JobOverview;