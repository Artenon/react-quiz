import React from "react";
import './Select.css'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`
    return (
        <div className='select'>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select 
                htmlFor={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
            { props.options.map((option, index) => {
                return (
                    <option
                        value={option.value}
                        key={index + option.value}
                    >
                        {option.text}
                    </option>
                )
            }) }
            </select>
        </div>
    )
}

export default Select;