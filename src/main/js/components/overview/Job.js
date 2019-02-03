import React from "react";

const Job = ({job}) => {
    return (
        <div>
            <p>{job.displayName}</p>
            <p>{job.url}</p>
            <p>{job.status}</p>
        </div>
    )
};

export default Job;
