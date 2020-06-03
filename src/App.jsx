import React, { Component } from 'react';
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgotPassword'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, history } from './routes'
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import AddEvidence from './components/cases/AddEvidence';
import UserProfile from './components/users/UserProfile';
import Header from './components/custom/Header';
import SideNavbar from './components/custom/SideNav';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DashboardLayout from './components/layouts/DashboardLayout';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    }
  }
  render() {
    const { expanded } = this.state;
    return (
      <Router history={history}>

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/cases" component={Home} />
          <PrivateRoute exact path="/users" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/forget-password" component={ForgotPassword} />
          <PrivateRoute path="/userprofile" component={Home} />
          <PrivateRoute path="/addevidence" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>


      </Router>
    );
  }
}

export default App;
