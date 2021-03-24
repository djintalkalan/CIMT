import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';




class SideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
   




    render() {

        return (
            
            <div className="sidebar" style="display: block;">
                <div className="inner menu">
                    <ul id="menu-menu-2">
                        <li className="menu-item"><a href="#">Dashboard</a></li>
                        <li className="menu-item menu-item-has-children"><a href="#">About</a>
                            <ul className="sub-menu">
                                <li className="menu-item"><a href="#">About1</a></li>
                                <li className="menu-item"><a href="#">About2</a></li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item-has-children"><a href="#">Blog</a></li>
                        <li className="menu-item current-menu-item page_item current_page_item "><a href="#">Contact</a></li>
                        <li className="menu-item menu-item-has-children "><a href="#" className="menu-down-arrow">Information</a>
                            <ul className="sub-menu" style="display: block;">
                                <li className="menu-item menu-item-has-children "><a href="#">Page Title1</a>
                                    <ul className="sub-menu">
                                        <li className="menu-item "><a href="#">Page Title2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <a href="#" className="collapse_menu"><i className="fa fa-chevron-circle-right"></i><span>Collapse Menu</span></a>
            </div>



        );
    }
}

export default SideNavbar;