import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        console.log("TEST:", this.props.isLoginReducer)
        if (this.props.isLoginReducer) {
            history.push('/')
        }
        this.state = {
            email: "",
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }



    handleSubmit = (event) => {

        // let this is login response from server

        this.setState({
            email: "", password: ""
        })
        event.preventDefault();
    }


    render() {
        console.log("email", this.state.email)
        return (
            <div className="login_block">
                <div className="inner">
                    <h2 className="text-center mb80 mt20">Crime Investigation Management Tool</h2>
                    <div className="text_wrapper">
                        <h4>Recover Password</h4>
                        <form
                            onSubmit={this.handleSubmit} >
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    type="text" className="form-control" name="login_user" placeholder="Phone/Email" />
                            </div>

                            <button type="submit" className="btn btn-normal">Submit Email</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);