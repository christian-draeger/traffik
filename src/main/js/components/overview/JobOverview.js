import React from "react";
import Job from "./Job";
import OverviewHeader from "./OverviewHeader";

const JobOverview = ({jobs, onAdd}) => {
    return (
        <div>
            <OverviewHeader onAdd={onAdd}/>
            {jobs.map(job => <Job job={job}/>)}
        </div>
    )
};

export default JobOverview;