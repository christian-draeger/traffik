import React from "react";

const JobResult = ({job}) => {
    return (
        <li>{job.status}</li>
    )
};

export default JobResult;