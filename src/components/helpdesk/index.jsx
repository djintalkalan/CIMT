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
// import { getDesignationList } from '../../api/ApiService';
// import { addDesignationApi} from '../../api/ApiService';

class Helpdesk extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    componentDidMount() {

    }
    

    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div className="inner helpdeskCt">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3 className="text-center">Help Desk</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="gjutitle text-center">Guru Jambheshwar University of Science & Technology, Hisar - Haryana (India)</div>
                                <div className="pduiictitle text-center">Pt. Deendayal Upadhyaya Innovation and Incubation Centre (PDUIIC)</div>
                                <h4 className="text-center mt50">Crime Investigation Management Tool</h4>
                                <h5 className="text-center mt30">Team Members</h5>
                                <div className="innovation_team">
                                    <div className="team_member">
                                        <div className="name">Sunil</div>
                                        <div className="designation">Software Developer</div>
                                    </div>
                                    <div className="team_member">
                                        <div className="name">Himanshu Chauhan</div>
                                        <div className="designation">Software Developer</div>
                                    </div>
                                    <div className="team_member">
                                        <div className="name">Mohit Kumar Jain</div>
                                        <div className="designation">Forensic</div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);

