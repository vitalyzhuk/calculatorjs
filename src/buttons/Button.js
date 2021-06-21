import React from "react";
import './Button.css';


export const Button = ({
    child,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    style
}) => {
    return (
    <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
      <header className="btn-header">
        {child}
      </header>
    </button>
    )
};
