// utils/withAuth.js - a HOC for protected pages
import React, {Component} from 'react';
import MySpinner from '../MySpinner/MySpinner';
import AuthService from './AuthService';

export default function withAuth(AuthComponent, sef=false, admin=false) {
    const Auth = new AuthService();
    return class Authenticated extends Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          user: Auth.getProfile()
        };
      }

      componentDidMount () {
        //console.log('withAuth');
        if (!Auth.loggedIn()) {
          if(this.props.history) this.props.history.push('/Login');
          this.setState({ isLoading: false, user: undefined });
          return;
        }
        const {user} = this.state;
        //console.log(user);
        if(!user) {
          if(this.props.history) this.props.history.push('/Login');
          this.setState({ isLoading: false, user: undefined });
          return;
        }
        if(sef && !admin) {
          if(!user.Sef) {
            if(this.props.history) this.props.history.push('/Login');
            this.setState({ isLoading: false });
            return;
          }
        }

        if(admin) {
          if(!user.Administracija) {
            if(this.props.history) this.props.history.push('/Login');
          }
        }

        this.setState({ isLoading: false });
      }

      render() {
        return (
          <div>
            {this.state.isLoading? <MySpinner />: <AuthComponent {...this.props}  auth={Auth} user={this.state.user} />}
          </div>
        );
      }
    };
}
