import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "./Spinner";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as selectors from "../reducer";
import Immutable from "seamless-immutable";
import * as actions from "../actions";

export class StaticButtons extends Component {
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

function mapStateToProps(state) {
  return {
    doiInfo: selectors.getDoiInfo(state),
    loading: selectors.getLoading(state),
    error: selectors.getError(state),
    keycloak: selectors.getKeycloak(state),
    doiFailure: selectors.getDoiFailure(state),
    addSuccess: selectors.getAddSuccess(state),
    pressed: selectors.getPressed(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub)),
    requestDoiInfo: (newPub) => dispatch(actions.requestDoiInfo(newPub)),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),
    changeKeycloak: (val) => dispatch(actions.changeKeycloak(val)),
    changeDoiInfo: (val) => dispatch(actions.changeDoiInfo(val)),
    setFailure: (val) => dispatch(actions.changeDoiFailure(val)),
    changeError: (val) => dispatch(actions.changeError(val)),
    changeAddSuccess: (val) => dispatch(actions.changeAddSuccess(val)),
    changePressed: (val) => dispatch(actions.changePressed(val)),
    changeYear: (val) => dispatch(actions.changeYear(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticButtons);
