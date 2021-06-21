import React from "react";
import './Button.css';


export const Button = ({
    child,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    return (
    <button style={{margin:10}} className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
        {child}
    </button>
    )
};
