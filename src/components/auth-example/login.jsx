// ./pages/login.js
import React, {Component} from 'react'
import AuthService from './AuthService'

const auth = new AuthService('http://localhost:5000')

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    if (auth.loggedIn()) {
      this.props.url.replaceTo('/admin');  // redirect if you're already logged in
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    // yay uncontrolled forms!
    auth.login(this.refs.email.value, this.refs.password.value)
      .then(res => {
        console.log(res);
        this.props.url.replaceTo('/admin');
      })
      .catch(e => console.log(e));  // you would show/hide error messages with component state here 
  }

  render () {
    return (
      <div>
         Login
          <form onSubmit={this.handleSubmit} >
            <input type="text" ref="email"/>
            <input type="password" ref="password"/>
            <input type="submit" value="Submit"/>
          </form>
      </div>
    )
  }
}

export default Login;