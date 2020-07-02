import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0
        }
    }

    render() {
        console.log("pathnameeee----->", window.location.pathname);
        this.state.path = window.location.pathname
        return (
            <div className="page-sidebar">
   
                <div className="sidebar-list position-relative">
                    {/* <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    <div className="box-circle ">
                        <Link to={'/users'} className={"" + (this.state.path == '/users' ? "active" : " ")}>
                            <span>Users</span>
                        </Link>
                    </div>

                    <div className="box-circle ">
                        <Link to={'/cases'} className={"" + (this.state.path == '/cases' ? "active" : " ")}>
                        <span>Cases</span>
                        </Link>
                    </div> */}

                    {/* <div className="box-circle ">
                        <Link to={'/addevidence'} className={"" + (this.state.path == '/addevidence' ? "active" : " ")}>
                        <span>Add Evidence</span>
                        </Link>
                    </div> */}

                    <ul id="menu-menu-2">
                        <li className="box-circle"><a href={'/'} className={"" + (this.state.path == '/' ? "active" : " ")} >Dashboard</a></li>
                        <li className="box-circle menu-item-has-children"><a href={'/users'} className={"" + (this.state.path == '/users' ? "active menu-down-arrow" : " ")} >Users</a>
                            <ul className="sub-menu">
                                <li className="box-circle"><a href="#">About1</a></li>
                                <li className="box-circle"><a href="#">About2</a></li>
                            </ul>
                        </li>
                        <li className="box-circle"><a href={'/cases'} className={"" + (this.state.path == '/cases' ? "active menu-down-arrow" : " ")} >Cases</a></li>
                        <li className="box-circle"><a href="#">Contact</a></li>
                        {/* <li className="box-circle menu-item-has-children "><a href="#" className="menu-down-arrow">Information</a>
                            <ul className="sub-menu" style="display: block;">
                                <li className="box-circle menu-item-has-children "><a href="#">Page Title1</a>
                                    <ul className="sub-menu">
                                        <li className="box-circle "><a href="#">Page Title2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                    </ul>

                </div>
            </div>
        );
    }
}

export default Sidebar;
