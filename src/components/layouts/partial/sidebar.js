import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../../public/images/profile.jpg';
import { localUrl } from '../../../api/ApiConstants';
import { connect } from "react-redux";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            // userSubmenuVisible1: false,
            // userSubmenuVisible2: false
            openedMenu: 0

        }
    }

    render() {
        let user_data = JSON.parse(localStorage.getItem("userData"))
        // console.log("pathnameeee----->", window.location.pathname);
        this.state.path = window.location.pathname
        return (
            <div className="page-sidebar">
                <div className="img-wrapper">
                    {/* <img src={user_data.profile_pic ? localUrl + user_data.profile_pic : logo} /> */}
                    <div className="image" style={{backgroundImage:`url(${user_data.profile_pic ? localUrl + user_data.profile_pic : logo})`}}></div>
                    <div className="name-designation mb5">{user_data.first_name ? user_data.first_name : ""} {user_data.designation && user_data.designation.designation ? " / " + user_data.designation.designation : ""}</div>
                </div>

                <div className="sidebar-list position-relative">
                    <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    <div className="box-circle menu-item-has-children">
                        <Link to={''} onClick={() => { this.setState({ openedMenu: this.state.openedMenu == 1 ? 0 : 1 }) }} >
                            <span>Add Details</span>
                        </Link>
                    </div>

                    {/** HERE SUBMENU UNDER USERS START its visiblity handled by custom onclick event that we added (userSubmenuVisible1) */}

                    {this.state.openedMenu == 1 &&
                        <div className="sub-menu">
                            {/** WE DEFINE CUSTOM submenu of users here */}
                            <div className="box-circle ">
                                <Link to={'/cases'} className={"" + (this.state.path == '/cases' ? "active" : " ")}>
                                    <span>&#8692; Cases</span>
                                </Link>
                            </div>

                            <div className={"box-circle"}>
                                <Link to={'/newchargesheet'} className={"" + (this.state.path == '/newchargesheet' ? "active" : " ")} >
                                    <span>&#8692; New Charge Sheet</span>
                                </Link>
                            </div>

                            <div className={"box-circle"}>
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Charge Sheet</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/drawingchargesheet'} className={"" + (this.state.path == '/drawingchargesheet' ? "active" : " ")} >
                                    <span>&#8692; Drawing up the Charge Sheet</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/faceDetection'} className={"" + (this.state.path == '/faceDetection' ? "active" : " ")} >
                                    <span>&#8692; Face Detection</span>
                                </Link>
                            </div>


                        </div>
                    }


                    <div className="box-circle menu-item-has-children">
                        <Link to={''} onClick={() => { this.setState({ openedMenu: this.state.openedMenu == 2 ? 0 : 2 }) }} >
                            <span>Admin</span>
                        </Link>
                    </div>

                    {/** HERE SUBMENU UNDER USERS START its visiblity handled by custom onclick event that we added (userSubmenuVisible2) */}

                    {this.state.openedMenu == 2 &&
                        <div className="sub-menu">
                            {/** WE DEFINE CUSTOM submenu of users here */}
                            <div className={"box-circle"}>
                                <Link to={'/users'} className={"" + (this.state.path == '/users' ? "active" : " ")} >
                                    <span>&#8692; Users</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/designations'} className={"" + (this.state.path == '/designations' ? "active" : " ")} >
                                    <span>&#8692; Designation</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/offices'} className={"" + (this.state.path == '/offices' ? "active" : " ")} >
                                    <span>&#8692; Office</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/district'} className={"" + (this.state.path == '/district' ? "active" : " ")} >
                                    <span>&#8692; District</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/articles'} className={"" + (this.state.path == '/articles' ? "active" : " ")} >
                                    <span>&#8692; Articles</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/misconduct'} className={"" + (this.state.path == '/misconduct' ? "active" : " ")} >
                                    <span>&#8692; Misconduct Type</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/sourcecomplaint'} className={"" + (this.state.path == '/sourcecomplaint' ? "active" : " ")} >
                                    <span>&#8692; Source Complaint</span>
                                </Link>
                            </div>
                            {/* <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Module Type</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Pincode Areas</span>
                                </Link>
                            </div> */}

                        </div>
                    }

                    <div className="box-circle ">
                        <Link to={'/helpdesk'} className={"" + (this.state.path == '/helpdesk' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Help Desk</span>
                        </Link>
                    </div>

                </div>
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

export default withRouter(connect(mapStateToProps, null)(Sidebar));
