import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class StaticButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
        manual: this.props.manual
    }
  }

onDOI = (event) => {
    this.props.onDOI(event)
}
onCancel = (event) => {
    this.props.onCancel(event)
}
onManual = (event) => {
    this.props.onManual(event)
}

  render() {
    return (
      <div className="static-buttons">
        {!this.props.manual && (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => this.onManual(event)}
          >
            Enter Manually
          </Button>
        )}
        {this.props.manual && (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => this.onDOI(event)}
          >
            Enter DOI
          </Button>
        )}
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
