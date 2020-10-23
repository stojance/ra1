
// ./pages/dashboard.js
// example of a protected page
import React from 'react';
import withAuth from  './withAuth';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

class Dashboard extends React.Component {
  logOutClick(e) {
    this.props.auth.logout();
  }

  render() {
     const user = this.props.auth.getProfile();
     let logged = () => {
       return (
        <ul className="nav navbar-nav ml-auto"> 
          <li className="nav-item">
            <span className="nav-link"> Current user: {user.ImePrezime} </span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/Login"} onClick={this.logOutClick.bind(this)}>Log out</Link>
          </li>
        </ul>
       );
     };
     let notLogged = () => {
       return (
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/Login"} id="loginLink">Log in</Link>
          </li>
        </ul>
       );
     };

     return user ? logged() : notLogged();
    
   }
}

export default withAuth(Dashboard);