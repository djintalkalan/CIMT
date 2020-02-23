import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'





class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <header>
                <div className="inner">
                    <div className="siteUrl">
                        <a >CIMT</a>
                    </div>
                    <a src="#" className="logoutCt">
                        <span className="logout"><FontAwesomeIcon className="sign-out" icon={faSignOutAlt} color={'white'} /></span>
                    </a>
                </div>
            </header>
        );
    }
}

export default Header;