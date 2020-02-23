import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import SideNav, { Toggle } from '@trendmicro/react-sidenav';






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
                <button classNameq={this.props.expanded?'open':'close'} onClick={()=>{this.props.toogleHandler(!this.props.expanded)}} />
                    {/* <div className="siteUrl">
                    
                        <a >CIMT</a>
                    </div> */}
                    <a src="#" className="logoutCt">
                        <span className="logout"><FontAwesomeIcon className="sign-out" icon={faSignOutAlt} color={'white'} /></span>
                    </a>
                </div>
            </header>
        );
    }
}

export default Header;