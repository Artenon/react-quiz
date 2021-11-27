import React from "react";
import './Menu.css';

const Menu = props => {
    const classes = ['menu']
    if (props.isOpen) {
        classes.push('open')
    } else {
        classes.push('closed')
    }

    return (
        <i
            className={classes.join(' ')}
            onClick={props.onMenu} 
        />
    )
}

export default Menu;