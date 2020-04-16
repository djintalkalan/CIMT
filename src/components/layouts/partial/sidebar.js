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
            <div className="page-sidebar fixedscroll">
   
                <div className="sidebar-list position-relative">
                    <div className="box-circle radius50">
                        <Link to={'/'} className={"radius50" + (this.state.path == '/' ? " active" : " ")}>Dashboard</Link>
                    </div>

                    <div className="box-circle radius50">
                        <Link to={'/users'} className={"radius50" + (this.state.path == '/users' ? " active" : " ")}>Users</Link>
                    </div>

                    <div className="box-circle radius50">
                        <Link to={'/cases'} className={"radius50" + (this.state.path == '/cases' ? " active" : " ")}>Cases</Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default Sidebar;
