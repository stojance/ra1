import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export default function UserInfo() {
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    console.log("context.userState", userState);
  }, [userState.user]);

  const logOutClick = () => {
    //props.auth.logout();
    userDispatch({ type: "LOG_OUT" });
  };

  const logged = () => (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        {/*<span className="nav-link"> Current user: {user.ImePrezime} </span>*/}
        <span className="nav-link">
          {" "}
          Current user: {userState.user.fullName}{" "}
        </span>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/Login"} onClick={logOutClick}>
          Log out
        </Link>
      </li>
    </ul>
  );

  const notLogged = () => (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={"/Login"} id="loginLink">
          Log in
        </Link>
      </li>
    </ul>
  );

  return userState?.user ? logged() : notLogged();
}
