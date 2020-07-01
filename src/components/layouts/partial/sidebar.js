import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            userSubmenuVisible: false

        }
    }

    render() {
        console.log("pathnameeee----->", window.location.pathname);
        this.state.path = window.location.pathname
        return (
            <div className="page-sidebar">

                <div className="sidebar-list position-relative">
                    <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    {/** WE REMOVE to={$path} from users because it has submenu and add custom click event */}


                    <div className="box-circle ">
                        <Link onClick={() => { this.setState({ userSubmenuVisible: !this.state.userSubmenuVisible }) }} >
                            <span>Users</span>
                        </Link>
                    </div>

                    {/** HERE SUBMENU UNDER USERS START its visiblity handled by custom onclick event that we added (userSubmenuVisible) */}

                    {this.state.userSubmenuVisible &&
                        <div className="sub-menu">
                            {/** WE DEFINE CUSTOM submenu of users here */}
                            <div className={" " + (this.state.path == '/users' ? 'active' : "")}>
                                <Link to={'/users'} >
                                    <span>Sub Menu 1</span>
                                </Link>
                            </div>

                            <div className={" " + (this.state.path == '/users' ? 'active' : "")}>
                                <Link to={'/users'} >
                                    <span>Sub Menu 2</span>
                                </Link>
                            </div>

                        </div>}


                    <div className="box-circle ">
                        <Link to={'/cases'} className={"" + (this.state.path == '/cases' ? "active" : " ")}>
                            <span>Cases</span>
                        </Link>
                    </div>

                    {/* <div className="box-circle ">
                        <Link to={'/addevidence'} className={"" + (this.state.path == '/addevidence' ? "active" : " ")}>
                        <span>Add Evidence</span>
                        </Link>
                    </div> */}

                </div>
            </div>
        );
    }
}

export default Sidebar;
