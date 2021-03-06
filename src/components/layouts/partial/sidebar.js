import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../public/images/profile.jpg';

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
        console.log("pathnameeee----->", window.location.pathname);
        this.state.path = window.location.pathname
        return (
            <div className="page-sidebar">
                <div className="img-wrapper">
                    <img src={logo} />
                </div>

                <div className="sidebar-list position-relative">
                    <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    <div className="box-circle menu-item-has-children">
                        <Link onClick={() => { this.setState({ openedMenu: this.state.openedMenu == 1 ? 0 : 1 }) }} >
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
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Issue of Charge Memo</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Follow up on Charge Memo</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Add Explanation Details</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Inquiry Officer Action Update</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/chargesheet'} className={"" + (this.state.path == '/chargesheet' ? "active" : " ")} >
                                    <span>&#8692; Follow up on Inquiry Report</span>
                                </Link>
                            </div>


                        </div>
                    }


                    <div className="box-circle menu-item-has-children">
                        <Link onClick={() => { this.setState({ openedMenu: this.state.openedMenu == 2 ? 0 : 2 }) }} >
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
                            {/* <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Office Location</span>
                                </Link>
                            </div> */}
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
                            {/* <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Division</span>
                                </Link>
                            </div> */}
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

export default Sidebar;
