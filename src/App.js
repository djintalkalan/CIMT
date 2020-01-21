import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="login_block">
        <div className="inner">
          <h2 className="text-center mb80 mt20">Crime Investigation Management Tool</h2>
          <div className="text_wrapper">
            <h4>Account Login</h4>
            <form target>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name="login_user" placeholder="Phone/Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="login_pwd" placeholder="********" />
                </div>
                <button type="submit" className="btn btn-normal">Sign in</button>
                <div className="signup mt20">
                  <a href="forget.html" className="">Forget Password</a>
                  <a href="register.html" className="mt5">Sign Up/Register</a>
                </div>
            </form>
          </div>
        </div>

        <div className="footer_block p10">CIMT &copy; 2020 | All Rights Reserved.</div>
      </div>

    );
  }
}

export default App;
