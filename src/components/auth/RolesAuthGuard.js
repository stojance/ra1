import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";

export function RolesAuthGuard(props) {
  const { userState } = React.useContext(UserContext);
  const user = userState.user;
  const { children, roles } = props;
  
  const canAccess = () => {
    if (user) {
      if (roles && roles.length && roles.length > 0) {
        //console.log("user.roles", user.roles);
        if (user.roles.length == 0) {
          return false;
        }

        let count = 0;
        for (let i = 0; i < roles.length; i++) {
          //console.log("roles[i]", roles[i]);
          if (user.roles.includes(roles[i])) {
            count++;
          }
        }
        
        return count > 0 ? true : false;
      }

      return true;
    }

    return false;
  };

  return canAccess() ? <>{children}</> : <Navigate to="/Login" />;
}
