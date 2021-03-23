import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import DataGrid from 'react-data-grid';
import BarChart from 'react-bar-chart';
import { history } from '../../routes';
import Header from '../custom/Header';

import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { faceDetectionApi } from '../../api/ApiService';

import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'
import faceDetection from '../../../public/images/faceDetection.jpg';

class FaceDetection extends Component {
    constructor(props) {
        super(props);
        
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    callOnClickFaceDetection = () => {
        faceDetectionApi().then(res => {
            // console.log("ADD CHARGE SHEET STATUS",JSON.stringify(res))
            // this.setState({addUserStatus:res.comment})
            if (res.success) {
                showSuccessToast("Face Detection Report")
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }


    componentDidMount() {
        // this.callFaceDetectionListApi()

    }

    

    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div className="inner">
                    {/* {this.renderFaceDetectionModal()} */}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>Face Detection</h3>
                            </div>
                        </div>
                        <div className="row mb100">
                            <div className="col-md-12">
                                <div className="faceDetection" id="faceDetection">
                                    <div className="demoImage mb40" style={{backgroundImage:`url(${faceDetection})`}}></div>
                                    <h5>Click here to detect face</h5>
                                    <a onClick={this.callOnClickFaceDetection} className="btn btn-sm btn-info mt10 btn-custom">Detect Face</a>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FaceDetection);

