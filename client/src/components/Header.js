import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <span href="#" className="left brand-logo">
                        Emailer
                    </span>
                    <ul className="right">
                        <li>
                            <button className='pink'>Login with Google</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default Header;