import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
import { loginApi } from '../../../api/ApiService';

import { showErrorToast } from '../../../utils/Utils';

// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class Login extends Component {
    constructor(props) {
        super(props);
        // this.props.isLoginReducer && history.push('/')
        localStorage.getItem('userData') && history.push('/')
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
        const params = {
            username: this.state.username,
            password: this.state.password,
        }

        this.callLoginApi(params)



        // // set login details in local storage

        // localStorage.setItem('userData', JSON.stringify(userData));
        // localStorage.setItem('userToken', JSON.stringify(userToken));
        // localStorage.setItem('isLogin', JSON.stringify(true));

        // // Now updating user's data in redux store
        // this.props.userDataAction(userData)
        // this.props.userTokenAction(userToken)
        // this.props.isLoginAction(true)

        // this.setState({
        //     username: "", password: ""
        // }, () => { history.push('/'); })

        event.preventDefault();
    }

    callLoginApi = (params) => {
        // console.log("SIGN_IN_API_PARAMS:" + JSON.stringify(params))
        window.showLoader()
        loginApi(params).then(res => {
            // console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            // history.push('/users')
            // return
            if (res && res.success) {
                this.setState({
                    isLoading: false,
                }, () => {
                    if (res.data) {
                        let dat = res.data;
                        // dat= dat.replace(/'/g,'"');
                        localStorage.setItem('userData', JSON.stringify(dat));
                        localStorage.setItem('userToken', JSON.stringify(res.token));
                        localStorage.setItem('isLogin', JSON.stringify(true));
                        this.props.userDataAction(dat)
                        this.props.userTokenAction(res.token)
                        this.props.isLoginAction(true)
                        history.push('/')
                    }
                })
            } else {
                this.setState({
                    isLoading: false,
                })
                if (res && res.error) {
                    // toast(res.error, {
                    //     position: "top-right",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // });
                    // alert(res.error)
                    showErrorToast(res.error)

                }
                // this.setStaticData()
            }

        }).catch(err => {
            this.setState({
                isLoading: false,
            })
            setTimeout(() => {
                if (err) {
                    alert(JSON.stringify(err));
                }
            }, 100);
            // this.setStaticData()
        }).finally(e => window.closeLoader())

    }

    // setStaticData = () => {

    //     const userData = {
    //         username: "1111111",
    //         phone: "11111111",
    //         age: "21"
    //     }

    //     localStorage.setItem('userData', JSON.stringify(userData));
    //     localStorage.setItem('userToken', JSON.stringify("MYSTATICTOKEN"));
    //     localStorage.setItem('isLogin', JSON.stringify(true));

    //     this.props.userDataAction(userData)
    //     this.props.userTokenAction("MYSTATICTOKEN")
    //     this.props.isLoginAction(true)

    //     history.push('/')
    // }

    logOut = (event) => {
        // clearing user's data in redux store

        this.props.userDataAction(null)
        this.props.userTokenAction(null)
        this.props.isLoginAction(false)
        event.preventDefault();
    }
    render() {
        // console.log("UserName", this.state.username)
        // console.log("Password", this.state.password)
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
                                    type="text" className="form-control" name="username" required placeholder="Phone/Email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    className="form-control" name="password" required placeholder="********" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">Sign in</button>
                            <div className="signup mt20">
                                <a href="forget-password" className="">Forget Password</a>
                                {/* <a href="sign-up">Sign Up/Register</a> */}
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
    // console.log("Redux State:", JSON.stringify(state))
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

