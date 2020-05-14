import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import * as selectors from '../reducer';

import Immutable from 'seamless-immutable';

export class AddPub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doi: ''
    }
    if(this.props.doiInfo){
    this.data = Immutable.asMutable(this.props.doiInfo, {deep: true});
    }
  }

  // onChangedoi(e) {
  //   this.setState({ doi: e.target.value })
  // }


  onSubmit(e) {
    e.preventDefault()

    const doiObject = {
      doi: this.state.doi
    };

    console.log(doiObject)
    this.props.fetchDoiInfo(doiObject);
    this.setState({ doi : " " })
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar style={{ background: '#2E3B55' }}
              title="Add a Publication"
            />
             <form onSubmit={this.onSubmit}>
            <br />
            <TextField
              hintText="Enter the doi"
              floatingLabelText="Enter a DOI"
              onChange={(event, newValue) => this.setState({ doi: newValue })}
            />
            <br />
            {this.data.length > 0  && <p>We have data</p>}
            <RaisedButton  label="Submit" primary={true} style={style} onClick={(event) => this.onSubmit(event)} />
            </form>
            <br />
            <p>Or</p>
            <Link to="/manualadd">
              <RaisedButton style={{ background: '#2E3B55' }} label="Enter Manually" primary={true} to="/manualadd"  />
            </Link>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};


function mapStateToProps(state) {
  return {
    doiInfo: selectors.getDoiInfo(state)

  };
}

function mapDispatchToProps(dispatch) {
  return {
    //postPubAction: (newPub) => dispatch(actions.postPubAction(newPub))
    fetchDoiInfo: (newPub) => dispatch(actions.fetchDoiInfo(newPub))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);

