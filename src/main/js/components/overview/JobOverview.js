import React from "react";
import styled from "styled-components";

const StyledJobOverview = styled.div`
    padding: 5px;
    width: 100%;
    max-width: 800px;
`;

const JobOverview = ({jobs}) => {
    return (
        <StyledJobOverview>
            {jobs.map(job => <li>{job.status}</li>)}
        </StyledJobOverview>
    )
};

export default JobOverview;