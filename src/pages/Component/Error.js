import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return(
        <>
        <div>
            <h1>404 Error Page</h1>
            <h4>Sorry,This page doesn't Exis</h4>
            <Link to={'/'}>Go Back to Home Page</Link>
        </div>
        </>
    )
}
export default Error;