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
            <SideNav expanded={this.props.expanded} style={{background:"#3f51b5",position:'fixed',top:64}} onToggle={(b)=>this.props.toogleHandler(b)}  >
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="home">        
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                    </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
                    </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                        </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>





        );
    }
}

export default SideNavbar;