import React from "react";
import './style.css';

const Button = ({
    children,
    className,
    ...props
}) => {
    const style = className ? 'btn ' + className : 'btn';
    
    return <button {...props} className={style}>{children}</button>
}

export default Button;