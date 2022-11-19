// ./pages/login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthServiceJson from "./AuthServiceJson";
import { UserContext } from "../../App";
import MySpinner from "../MySpinner/MySpinner";
import { AiOutlineUser } from "react-icons/ai";

const auth = new AuthServiceJson();

export default function Login() {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const inputRef = React.useRef();
  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoaded(false);
    const usr = await auth.login(inputRef.current.value);
    setIsLoaded(true);
    if (usr) {
      context.userDispatch({ type: "LOG_IN" });
      navigate(-1);
    } else {
      auth.logout();
      context.userDispatch({ type: "LOG_OUT" });
    }
  };

  const form = () => (
    <div className="panel panel-heading">
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="col-md-offset-2 col-md-10">
            <h3 className="display-4">Најава</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <div className="input-group mb-3">
                  <input
                    type="password"
                    ref={inputRef}
                    autoComplete="true"
                    className="form-control"
                    placeholder="Шифра..."
                    aria-label="Шифра..."
                    aria-describedby="basic-addon2"
                    autoFocus
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      title="Најави се..."
                      data-toggle="tooltip"
                    >
                      <AiOutlineUser />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return isLoaded ? form() : <MySpinner />;
}
