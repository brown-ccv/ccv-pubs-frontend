import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';
import AddPub from './AddPub';


class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    console.log(this.state.keycloak)
    if(this.state.keycloak) {
        if(this.state.authenticated) return (
            console.log("here"),
          <div>
            {/* <UserInfo keycloak={this.state.keycloak} />
            <Logout keycloak={this.state.keycloak} /> */}
             <AddPub />
          </div>
        // <AddPub />
        ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;