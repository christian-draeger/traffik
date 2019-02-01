import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";

const SuccessTemplate = ({message}) => {
    return (
        <span>
            <FontAwesomeIcon
                icon="check-circle"
                size="lg"
            />
            {" " + message}
        </span>
    )
};

const ErrorTemplate = ({message}) => {
    return (
        <span>
            <FontAwesomeIcon
                icon="exclamation-circle"
                size="lg"
            />
            {" " + message}
        </span>
    )
};

export const alertSuccess = (message) => {
    toast.success(<SuccessTemplate message={message}/>);
};

export const alertError = (message) => {
    toast.error(<ErrorTemplate message={message}/>);
};

const Toaster = () => {
    return <ToastContainer />
};

export default Toaster;