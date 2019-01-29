import React from "react";

const JobResult = ({job}) => {
    console.log(job);
    return (
        <li>{job.status}</li>
    )
};

export default JobResult;