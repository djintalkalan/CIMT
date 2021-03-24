import React, { Component } from 'react';
// import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
// import { withRouter } from 'react-router-dom';
import { getChargedOfficerByIdApi } from '../../api/ApiService';
import { showWarningToast, showSomethingWentWrong } from '../../utils/Utils';


//Open console and perform an action on page


class DrawingChargeSheet extends Component {
    constructor(props) {
        super(props);
        // console.log("HISTORY:-", props.location.state.data)
       this.state = {
            chargedOfficerList: null
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSearchChargeSheet = (e) => {
        e.preventDefault();
        const { case_id } = this.state

        if (!case_id) {
            showWarningToast("Insert Case ID")
            return
        };

        const params = {
            case_id: case_id
        }

        getChargedOfficerByIdApi(params).then(res => {
            if (res.success) {
                this.setState({ chargedOfficerList: res.data })
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            // console.log(e);
            showSomethingWentWrong()
        });
    }

    renderGetchargedOfficerList() {
        let { chargedOfficerList } = this.state
        // console.log("chargedOfficerList", this.state.chargedOfficerList);
        if (chargedOfficerList && chargedOfficerList.length > 0)
            return (
                <div>
                    {chargedOfficerList.map((item, index) => (
                        <div className="inner">
                            <span className="chargedOfficesTitle">{item.user.first_name + " " + item.user.last_name}</span>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Username : </span>
                                    <span className="value">{item.user.username}</span>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Email : </span>
                                    <span className="value">{item.user.email}</span>
                                </div>
                                <div className="col-md-6">
                                    <span className="title">Treasury Code : </span>
                                    <span className="value">{item.user.treasury_code}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Designation : </span>
                                    <span className="value">{item.user.designation.designation ? item.user.designation.designation : " "}</span>
                                </div>
                                <div className="col-md-6">
                                    <span className="title">Work Place : </span>
                                    <span className="value">{item.user.office.office_name}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Phone No : </span>
                                    <span className="value">{item.user.phone_no}</span>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-right mt10">
                                    {/* <button type="submit" className="btn btn-sm btn-dark">View Full Details</button> */}
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            )
    }

    componentDidMount() {
        // this.callRoleListApi()

    }
    

    render() {
        // if(!this.state.chargedOfficerList) return null
        // console.log("Charged Officer List", JSON.stringify(this.state.chargedOfficerList))
        return (
            <div className="evidenceCt">
                <div className="container-fluid customForm pb20">

                    <div className="inner">
                        <h5>Follow up on Charge Memo</h5>
                        <form className="mb60"
                                onSubmit={this.handleSearchChargeSheet} >
                            <div className="row mt30 mb30">
                                <div className="col-md-4 text-right">
                                    <div className="title">Search Case : </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" id="case_id" name="case_id" className="form-control case_id" onChange={this.handleChange} placeholder="Search Case" />
                                </div>
                                <div className="col-md-3">
                                    <Button type="submit" className="btn btn-success">Submit</Button>
                                    {/* <a onClick={this.handleSearchChargeSheet} className="btn btn-sm btn-info btn-custom">Search</a> */}
                                </div>
                            
                            </div>
                        </form>
                        <div className="chargedOfficerCt mx20 my40 mb60">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Case Number : </span>
                                    <span className={ this.state.chargedOfficerList ? this.state.chargedOfficerList.id : "-" }></span>
                                </div>  
                                <div className="col-md-6">
                                    <span className="title">Controlling Officer : </span>
                                    <span className="value"></span>
                                </div>
                            </div>
                            {this.state.chargedOfficerList ? this.renderGetchargedOfficerList() : (
                                <div className="inner">
                                <span className="chargedOfficesTitle">Charged Officer</span>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="title">Username : </span>
                                        <span className="value">-</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="title">Email : </span>
                                        <span className="value">-</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="title">Treasury Code : </span>
                                        <span className="value">-</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="title">Designation : </span>
                                        <span className="value">-</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="title">Work Place : </span>
                                        <span className="value">-</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="title">Phone No : </span>
                                        <span className="value">-</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-right mt10">
                                        {/* <button type="submit" className="btn btn-sm btn-dark">View Full Details</button> */}
                                    </div>
                                </div>
                            </div>
                            )}
                            
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12 mx20">
                                <a href="#" className="btn btn-info mr20 mb10">Add Dispatch Detail</a>
                                <a href="#" className="btn btn-info mr20 mb10">Add SR Entry Details</a>
                                <a href="#" className="btn btn-info mr20 mb10">Add Follow-up Action</a>
                            </div>
                        </div> */}
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log("Redux State:", JSON.stringify(state))
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawingChargeSheet);

