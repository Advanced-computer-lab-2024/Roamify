import React from "react";
import "./Buttons.css";


const SubmitButton = ({ children, onClick, type = 'submit' }) => {
    return (
        <button className="submit-button" type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default SubmitButton;