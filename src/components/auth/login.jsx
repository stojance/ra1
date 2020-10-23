// ./pages/login.js
import React from 'react';
import AuthService from './AuthService';
import { UserContext } from './../../App';
import MySpinner from '../MySpinner/MySpinner';

const auth = new AuthService();

const Login = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const inputRef = React.useRef();
  const context = React.useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputRef.current.value);
    //console.log(context);
    setIsLoaded(false);
    auth.login(inputRef.current.value)
      .then(res => {
        //console.log('res');
        //console.log(context);
        setIsLoaded(true);
        context.logIn();
        //console.log(context);
        props.history.goBack();
      })
      .catch(e => {
        setIsLoaded(true);
        console.log(e);
        auth.logout();
        context.logOut();
      });  // you would show/hide error messages with component state here 
  }

  const form = () => (
    <div className = "panel panel-heading" >
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="col-md-offset-2 col-md-10">
                <h3 className="display-4">Најава</h3>
              </div>
              <form onSubmit={handleSubmit} >
                <div className="form-group">
                  <div className="col-md-offset-2 col-md-10">
                    <div className="input-group mb-3">
                      <input type="password"
                        ref={inputRef}
                        autoComplete={true}
                        className="form-control"
                        placeholder="Шифра..."
                        aria-label="Шифра..."
                        aria-describedby="basic-addon2"
                        autoFocus
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-outline-primary fa fa-user-alt" title="Најави се..." data-toggle="tooltip" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </div >
  );

  return (isLoaded? form(): <MySpinner/>);
}

export default Login;