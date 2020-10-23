import React from 'react';
import withAuth from './withAuth';
import { Link } from "react-router-dom";
import { UserContext } from './../../App';

const UserInfo = (props) => {
  const [user, setUser] = React.useState();
  const context = React.useContext(UserContext)

  React.useEffect(() => {
    setUser(context.user);
    console.log(context);
  }, [context.user]);

  const logOutClick = () => {
    props.auth.logout();
    context.logOut();
  };

  const logged = () => (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <span className="nav-link"> Current user: {user.ImePrezime} </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Login"} onClick={logOutClick}>Log out</Link>
        </li>
      </ul>
    );
  
  const notLogged = () => (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/Login"} id="loginLink">Log in</Link>
        </li>
      </ul>
    );

  return user ? logged() : notLogged();
}

export default withAuth(UserInfo);