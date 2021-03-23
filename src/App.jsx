import React, { Component } from 'react';
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgotPassword'
import ResetPassword from './components/auth/resetPassword'
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
import { ToastContainer } from 'react-toastify';
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
          <Route path="/login" component={Login} />
          <Route path="/forget-password" component={ForgotPassword} />
          <Route path="/resetpass" component={ResetPassword} />

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/users" component={Home} />
          <PrivateRoute path="/userprofile" component={Home} />
          <PrivateRoute path="/changepass" component={Home} />

          <PrivateRoute exact path="/cases" component={Home} />
          <PrivateRoute path="/addevidence" component={Home} />
          <PrivateRoute path="/newchargesheet" component={Home} />
          <PrivateRoute path="/chargesheet" component={Home} />
          <PrivateRoute path="/drawingchargesheet" component={Home} />
          <PrivateRoute path="/faceDetection" component={Home} />

          <PrivateRoute path="/designations" component={Home} />
          <PrivateRoute path="/offices" component={Home} />
          <PrivateRoute path="/district" component={Home} />
          <PrivateRoute path="/misconduct" component={Home} />
          <PrivateRoute path="/articles" component={Home} />
          <PrivateRoute path="/sourcecomplaint" component={Home} />

          <PrivateRoute path="/helpdesk" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>

        <ToastContainer
         
        />
        {/* Same as */}
        <ToastContainer />


      </Router>
    );
  }
}

export default App;
