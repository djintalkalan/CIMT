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
            <div className="headerCt">
                <div className="inner">
                    <span className="siteUrl">
                        <a src="/">CIMT</a>
                    </span>
                    <span className="logout">
                        <Button bsPrefix="btn btn-primary" variant="primary">
                            Super button </Button>
                        <FontAwesomeIcon className="sign-out" icon={faSignOutAlt} color={'red'} />
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;