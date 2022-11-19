import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function withAuth(Controla, roles) {

  return function (props) {
    const { userState } = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
      console.log("roles", roles, typeof(roles));
      console.log("userState", userState, typeof(userState.roles));
      if (!userState.user) {
        navigate("/login");
        return;
      }

      if (roles && roles.length && roles.length > 0) {
        console.log("userState.user.roles", userState.user.roles)
        const userRoles = userState.user.roles || [];
        console.log("userRoles", userRoles);
        if (userRoles.length == 0) {
          navigate("/login");
          return;
        }
        let count = 0;
        for (let i = 0; i < roles.length; i++) {
          console.log("roles[i]", roles[i]);
          if(userRoles.includes(roles[i])){
            count++;
          }
        }
        console.log("count", count);
        if(count == 0){
            navigate("/login");
          return;
        }
      }
    }, []);

    return <Controla />;
  };
}
