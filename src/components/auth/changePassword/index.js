import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
import { changePassApi } from '../../../api/ApiService';
import { ToastContainer, toast } from 'react-toastify';
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass: "",
            newpass: "",
            confirmpass: "",
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
    }




    handleSubmit = (event) => {
        const params = {
            oldpass: this.state.oldpass,
            newpass: this.state.newpass,
        }

        const { newpass, confirmpass } = this.state;
        // perform all neccassary validations
        if (newpass !== confirmpass) {
            alert("Passwords don't match");
        } else {
            this.callChangePassApi(params)
        }

        event.preventDefault();
    }

    callChangePassApi = (params) => {
        console.log("SIGN_IN_API_PARAMS:" + JSON.stringify(params))

        changePassApi(params).then(res => {
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
        console.log("email", this.state.email)
        return (
            <div className="dashboardCt pt20">
                <div className="inner">
                <div className="container customForm customBorder py20">
                        <form
                            onSubmit={this.handleSubmit} >
                            <div className="row">
                                <div className="col-md-12"><h5 className="mb30">Change Password</h5></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Old Password </span>
                                    <input
                                        // value={this.state.oldpass}
                                        type="text" className="form-control" name="oldpass" id="oldpass" placeholder="Old Password" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">New Password </span>
                                    <input
                                        // value={this.state.newpass}
                                        type="text" className="form-control" name="newpass" id="newpass" placeholder="New Password" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Confirm Password </span>
                                    <input
                                        type="text" className="form-control" name="confirmpass" id="confirmpass" placeholder="Confirm Password" required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-sm btn-primary mt30">Submit</button>
                        </form>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);