import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class SuccessScreen extends Component {
  // constructor(props) {
  //   super(props);
  // }

onDOI = (event) => {
    this.props.onDOI(event)
}
onCancel = (event) => {
    this.props.onCancel(event)
}


  render() {
    return (
        <div className="success-screen">
        <h1>Success!</h1>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => this.onDOI(event)}
        >
          Insert Another Publication
        </Button>
        <div className="divider" />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => this.onCancel(event)}
        >
          Back to Home
        </Button>
      </div>
    );
  }
}

