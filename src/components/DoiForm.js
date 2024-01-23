import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from './Spinner';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import Immutable from 'seamless-immutable';
import * as actions from '../actions';

export class DoiForm extends Component {
  /**
   * When a user submits a DOI for fetch from CrossRef API. Erases
   * current DOI info if there is any and requests info.
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.setFailure(false);
    const newDoiInfo = {
      data: {},
      status: 'empty',
    };
    this.props.changeDoiInfo(newDoiInfo);
    const doiObject = {
      doi: this.doi,
    };
    this.props.requestDoiInfo(doiObject);
    this.data = Immutable.asMutable(this.props.doiInfo, { deep: true });
    this.props.changePressed(true);
    this.props.changeLoading(true);
    this.props.changeError(null);
  }

  render() {
    return (
      <div className="doi-width">
        <Form>
          <Form.Group controlId="doientry">
            <Form.Label>Please enter a DOI or DOI URL</Form.Label>
            <Form.Control
              type="doi"
              placeholder="Enter DOI or URL"
              onChange={(event) => {
                this.doi = event.target.value;
              }}
            />
          </Form.Group>
        </Form>

        <br />
        <Spinner loading={this.props.loading} className="spinner" size={100} />
        {
          <Button variant="contained" color="primary" onClick={(event) => this.onSubmit(event)}>
            Submit
          </Button>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    doiInfo: selectors.getDoiInfo(state),
    loading: selectors.getLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestDoiInfo: (newPub) => dispatch(actions.requestDoiInfo(newPub)),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),
    changeDoiInfo: (val) => dispatch(actions.changeDoiInfo(val)),
    setFailure: (val) => dispatch(actions.changeDoiFailure(val)),
    changeError: (val) => dispatch(actions.changeError(val)),
    changePressed: (val) => dispatch(actions.changePressed(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoiForm);
