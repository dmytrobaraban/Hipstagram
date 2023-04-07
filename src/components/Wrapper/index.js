import React from "react";
import { useSelector } from "react-redux";
import './style.css'

const Wrapper = ({children}) => {
    const theme = useSelector(state => state.ui.theme);

    const className = `wrapper ${theme}` 

    return <div className={className}>{children}</div>
}

export default Wrapper;