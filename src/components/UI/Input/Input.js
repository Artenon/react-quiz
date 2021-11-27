import React from "react";
import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

const Input = props => {
    const classes = ['input']
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`
    
    if (isInvalid(props)) {
        classes.push('invalid')
    }

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            { isInvalid(props)
            ? <span>{props.errorMessage || 'Enter correct value'}</span>
            : null}
        </div>
    )
}

export default Input