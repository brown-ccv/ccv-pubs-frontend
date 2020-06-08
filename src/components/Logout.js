import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  logout() {
    this.props.history.push("/");
    console.log(this.props.keycloak)
    this.props.keycloak.logout();
    this.props.changeAuthenticated(authenticated);
  }

  render() {
    return <button onClick={() => this.logout()}>Logout</button>;
  }
}
export default withRouter(Logout);
