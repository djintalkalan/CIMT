import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
import { passwordResetApi } from '../../../api/ApiService';
import { ToastContainer, toast } from 'react-toastify';
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
    }

    handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            console.log(this.state);
      
            let input = {};
            input["name"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            this.setState({input:input});
      
            alert('Demo Form is submited');
        }
    }
      
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["name"]) {
        isValid = false;
        errors["name"] = "Please enter your name.";
        }
    
        if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
        }
        }
      
        if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
        }
    
        if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
        }
    
        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
            
        if (input["password"] != input["confirm_password"]) {
            isValid = false;
            errors["password"] = "Passwords don't match.";
        }
        } 
    
        this.setState({
        errors: errors
        });
    
        return isValid;
    }


    // handleSubmit = (event) => {
    //     const params = {
    //         password: this.state.password,
    //     }

    //     const { password, confirmPassword } = this.state;
    // // perform all neccassary validations
    //     if (password !== confirmPassword) {
    //         alert("Passwords don't match");
    //     } else {
    //         alert("Password match");
    //         // this.callPassResetApi(params)
    //     }
    //     event.preventDefault();
    // }

    callPassResetApi = (params) => {
        console.log("SIGN_IN_API_PARAMS:" + JSON.stringify(params))

        passwordResetApi(params).then(res => {
            const notify = () => toast("Wow so easy !");
            console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            // history.push('/users')

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
        });

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
                             <div class="form-group">
                                <label for="password">Password:</label>
                                <input 
                                type="password" 
                                name="password" 
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Enter password" 
                                id="password" />
                    
                                <div className="text-danger">{this.state.errors.password}</div>
                            </div>
                    
                            <div class="form-group">
                                <label for="password">Confirm Password:</label>
                                <input 
                                type="password" 
                                name="confirm_password" 
                                value={this.state.input.confirm_password}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Enter confirm password" 
                                id="confirm_password" />
                    
                                <div className="text-danger">{this.state.errors.confirm_password}</div>
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