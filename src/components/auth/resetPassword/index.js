import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
import { passwordResetApi } from '../../../api/ApiService';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../../utils/Utils';
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // input: {},
            // errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const params = {
            password: this.state.password,
            token: this.props.match.params.token
        }

        const { password } = this.state;
   
        this.callPassResetApi(params)
    }

    callPassResetApi = (params) => {
        console.log("SIGN_IN_API_PARAMS:" + JSON.stringify(params))

        passwordResetApi(params).then(res => {
            console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Password Reset Successfully.")
            }
            else {
                showErrorToast(res.error)
            }
        })
        .catch(err => console.log(err))

    }


    render() {
        console.log("data", this.state.password)
        return (
            <div className="login_block">
                <div className="inner">
                    <h2 className="text-center mb80 mt20">Crime Investigation Management Tool</h2>
                    <div className="text_wrapper">
                        <h4>Reset Password</h4>
                        <form
                            onSubmit={this.handleSubmit} >
                             <div className="form-group">
                                <label>New Password</label>
                                <input
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    type="password" className="form-control" id="password" name="password" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    type="text" className="form-control" id="confirmPassword" name="confirmPassword" />
                            </div>
                            <button type="submit" className="btn btn-sm btn-primary">Reset</button>
                            <div className="signup mt20">
                                <a href="login" className="">Login</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);