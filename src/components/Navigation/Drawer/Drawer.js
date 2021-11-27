import React from "react";
import './Drawer.css';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/BackDrop/BackDrop';

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}
]

class Drawer extends React.Component {
    renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact.toString()}
                        className={'active'}
                        onClick={() => this.props.onCloseBackdrop()}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const classes =['drawer']

        if (!this.props.isOpen) {
            classes.push('closed')
        }

        return (
            <React.Fragment>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onCloseBackdrop} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer