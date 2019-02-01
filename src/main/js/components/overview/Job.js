import React, {Fragment} from "react";
import Input from "./Input";

const Job = ({job}) => {
    return (
        <Fragment>
            <Input/>
            <li>{job.status}</li>
        </Fragment>
    )
};

export default Job;
