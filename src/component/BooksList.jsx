import React from "react";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("/");
    };
    return (
        <div>
            <h1>This is Books List Page</h1>
            <button onClick={() => handleOnClick()}>Back to Home</button>
        </div>
    );
};

export default BooksList;
