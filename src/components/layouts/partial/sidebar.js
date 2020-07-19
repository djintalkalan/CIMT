import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../public/images/profile.jpg';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            userSubmenuVisible1: false,
            userSubmenuVisible2: false

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
                        <Link onClick={() => { this.setState({ userSubmenuVisible1: !this.state.userSubmenuVisible1 }) }} >
                            <span>Add Details</span>
                        </Link>
                    </div>

                    {/** HERE SUBMENU UNDER USERS START its visiblity handled by custom onclick event that we added (userSubmenuVisible1) */}

                    {this.state.userSubmenuVisible1 &&
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
                                <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")} >
                                    <span>&#8692; Charge Sheet</span>
                                </Link>
                            </div>


                        </div>
                    }


                    <div className="box-circle menu-item-has-children">
                        <Link onClick={() => { this.setState({ userSubmenuVisible2: !this.state.userSubmenuVisible2 }) }} >
                            <span>Admin</span>
                        </Link>
                    </div>

                    {/** HERE SUBMENU UNDER USERS START its visiblity handled by custom onclick event that we added (userSubmenuVisible2) */}

                    {this.state.userSubmenuVisible2 &&
                        <div className="sub-menu">
                            {/** WE DEFINE CUSTOM submenu of users here */}
                            <div className={"box-circle"}>
                                <Link to={'/users'} className={"" + (this.state.path == '/users' ? "active" : " ")} >
                                    <span>&#8692; Users</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Designation</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Office</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Office Location</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; District</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Division</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Module Type</span>
                                </Link>
                            </div>
                            <div className={"box-circle"}>
                                <Link to={'/#'} >
                                    <span>&#8692; Pincode Areas</span>
                                </Link>
                            </div>

                        </div>
                    }

                    <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
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
