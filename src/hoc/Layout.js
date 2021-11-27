import React from "react";
import './Layout.css';


class Layout extends React.Component {
    

    render() {
        return (
            <div className='layout'>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout