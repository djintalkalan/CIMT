import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import SideNav, { Toggle } from '@trendmicro/react-sidenav';
import { withRouter } from 'react-router-dom';






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
                {/* <button className={this.props.expanded?'open':'close'} onClick={()=>{this.props.toogleHandler(!this.props.expanded)}} /> */}
                    <div className="siteUrl">
                    
                        <a >CIMT</a>
                    </div>
                    <a src="#" className="logoutCt">
                        <span className="logout"><FontAwesomeIcon onClick={(event)=>{
                           


                                //  clearing user's details from local storage
                                localStorage.removeItem('userData');
                                localStorage.removeItem('userToken');
                                localStorage.setItem('isLogin', JSON.stringify(false));
                                // clearing user's data in redux store
                        
                                this.props.userDataAction(null)
                                this.props.userTokenAction(null)
                                this.props.isLoginAction(false)
                                history.push('/login')
                                event.preventDefault();
                        
                        }} className="sign-out" icon={faSignOutAlt} color={'white'} /></span>
                    </a>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);