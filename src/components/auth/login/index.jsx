import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'

// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class Login extends Component {
    constructor(props) {
        super(props);
        this.props.isLoginReducer && history.push('/')
        this.state = {
            username: "",
            password: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })

    }

    handleSubmit = (event) => {

        // let this is login response from server
        const userData = {
            username: this.state.username,
            password: this.state.password,
            name: "Deepak Jaglan",
            age: "21",
            email: "djintalkalan.dj@gmail.com"
        }
        const userToken = "sjn89snns9s09s"

        // set login details in local storage

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userToken', JSON.stringify(userToken));
        localStorage.setItem('isLogin', JSON.stringify(true));

        // Now updating user's data in redux store
        this.props.userDataAction(userData)
        this.props.userTokenAction(userToken)
        this.props.isLoginAction(true)

        this.setState({
            username: "", password: ""
        }, () => { history.push('/'); })

        event.preventDefault();
    }

    logOut = (event) => {
        // clearing user's data in redux store

        this.props.userDataAction(null)
        this.props.userTokenAction(null)
        this.props.isLoginAction(false)
        event.preventDefault();
    }
    render() {
        console.log("UserName", this.state.username)
        console.log("Password", this.state.password)
        return (
            <div className="login_block">
                <div className="inner">
                    <h2 className="text-center mb80 mt20">Crime Investigation Management Tool</h2>
                    <div className="text_wrapper">
                        <h4>Account Login</h4>
                        <form
                            onSubmit={this.handleSubmit} >
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    type="text" className="form-control" name="login_user" placeholder="Phone/Email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    className="form-control" name="login_pwd" placeholder="********" />
                            </div>
                            <button type="submit" className="btn btn-normal">Sign in</button>
                            <div className="signup mt20">
                                <a href="forget-password" className="">Forget Password</a>
                                <a href="sign-up" className="mt5">Sign Up/Register</a>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="footer_block p10">CIMT &copy; 2020 | All Rights Reserved.</div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    console.log("Redux State:", JSON.stringify(state))
    return {
        userDataReducer: state.userDataReducer,
        isLoginReducer: state.isLoginReducer,
        userTokenReducer: state.userTokenReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userDataAction: payload => dispatch(userDataAction(payload)),
        isLoginAction: payload => dispatch(isLoginAction(payload)),
        userTokenAction: payload => dispatch(userTokenAction(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

