
// ./pages/dashboard.js
// example of a protected page
import React from 'react';
import withAuth from  './withAuth';

class Dashboard extends React.Component {
   render() {
     const user = this.props.auth.getProfile();
     return (   
         <div>Current user: {user.email}</div>
     );
   }
}

export default withAuth(Dashboard);