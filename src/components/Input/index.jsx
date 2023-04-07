import React from "react";
import './style.css'

const Input = React.forwardRef(({
    label,
    error,
    ...props
}, ref) => {
    return (
        <div className="input">
            <label className="input_label">
                <span className="label-text">{label}</span>
                <input ref={ref} {...props}/>
                {error && <span className="input_error">{error.message}</span>}
            </label>
        </div>
    )
})

export default Input;