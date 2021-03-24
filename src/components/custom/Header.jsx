import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../../public/images/profile.jpg';
import { history } from '../../routes';
import { localUrl } from '../../api/ApiConstants';
import { logoutApi} from '../../api/ApiService';
import { showSuccessToast, showErrorToast } from '../../utils/Utils'
import { connect } from "react-redux";







class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

    }

    showMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
    }
      
    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    logout() {
        logoutApi().then((res) => {
            // console.log("Response of Logout", res)
            if (res.success) {
                showSuccessToast(res.data)
                localStorage.clear();
                history.push('/login')
            }
            else {
                showErrorToast("Something went wrong")
            }

        }).catch((err) => {
            // console.log("Error is", err)
            // showErrorToast("Something went wrong")
        })
    }

    render() {
        let user_data = this.props.userDataReducer
        // console.log("User Data", {user_data.profile_pic})
        return (
            <header>
                <div className="inner">
                {/* <a className={this.props.expanded?'open':'close'} onClick={()=>{this.props.toogleHandler(!this.props.expanded)}} /> */}
                    <div className="siteUrl">
                        <a >CIMT</a>
                    </div>
                    <a src="#" className="logoutCt" onClick={this.showMenu} style={{backgroundImage:`url(${user_data.profile_pic ? localUrl + user_data.profile_pic : logo})`}} >
                        {/* <img src={user_data.profile_pic ? localUrl + user_data.profile_pic : logo} /> */}
                    </a>
         
                    {
                    this.state.showMenu
                        ? (
                        <div className="menuCt">
                            <button onClick={()=> {history.push('/userprofile')}}> User Profile </button>
                            <button onClick={()=> this.logout()}> Logout </button>
                            <button onClick={()=> {history.push('/changepass')}}> Change Password </button>
                        </div>
                        )
                        : (
                        null
                        )
                    }

                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    // console.log("Redux State:", JSON.stringify(state))
    return {
        userDataReducer: state.userDataReducer,
        isLoginReducer: state.isLoginReducer,
        userTokenReducer: state.userTokenReducer
    };
};

export default withRouter(connect(mapStateToProps, null)(Header));