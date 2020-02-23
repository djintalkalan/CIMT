import React, { Component } from 'react';
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgotPassword'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, history } from './routes'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


import Dashboard from './components/dashboard';
import Cases from './components/cases';
import Header from './components/custom/Header';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      expanded:true
    }
  }
  render() {
    const {expanded} =  this.state;
    return (
      <Router history={history}>
        <Switch>
          <Route render={({ location, history }) => (
            <React.Fragment>
              <Header/>
              <SideNav  expanded={expanded} style={{background:"#3f51b5",position:'fixed',top:64,bottom: 44}}
                onSelect={(selected) => {
                  const to = '/' + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
                onToggle={(b)=>this.setState({expanded:b})} >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="">
                  <NavItem eventKey="">
                    <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                      Home
                        </NavText>
                  </NavItem>
                  <NavItem eventKey="cases">
                    <NavIcon>
                      <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                      Cases
                        </NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main style={{marginTop:64}}>
                <PrivateRoute exact path="/" component={props => <Dashboard expanded={expanded} />} />
                <PrivateRoute exact path="/cases" component={props => <Cases expanded={expanded} />} />
              </main>
            </React.Fragment>
          )}
          />
          <Route path="/login" component={Login} />
          <Route path="/forget-password" component={ForgotPassword} />
          <Redirect from="*" to="/" />
        </Switch>

      </Router>
    );
  }
}

export default App;
