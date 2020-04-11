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
            // <SideNav expanded={this.props.expanded} style={{background:"#3f51b5",position:'fixed',top:64}} onToggle={(b)=>this.props.toogleHandler(b)}  >
            //     <SideNav.Toggle/>
            //     <SideNav.Nav defaultSelected="home">        
            //         <NavItem eventKey="home">
            //             <NavIcon>
            //                 <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>
            //                 Home
            //         </NavText>
            //         </NavItem>
            //         <NavItem eventKey="charts">
            //             <NavIcon>
            //                 <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>
            //                 Charts
            //         </NavText>
            //             <NavItem eventKey="charts/linechart">
            //                 <NavText>
            //                     Line Chart
            //             </NavText>
            //             </NavItem>
            //             <NavItem eventKey="charts/barchart">
            //                 <NavText>
            //                     Bar Chart
            //             </NavText>
            //             </NavItem>
            //         </NavItem>
            //     </SideNav.Nav>
            // </SideNav>

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