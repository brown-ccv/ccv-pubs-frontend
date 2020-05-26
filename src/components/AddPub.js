import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import ManualAdd from './ManualAdd';
import Immutable from 'seamless-immutable';
import UserInfo from './UserInfo';
import Spinner from './Spinner';
import Keycloak from 'keycloak-js';


export class AddPub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doi: '',
      pressed: false,
    }
    if(this.props.doiInfo){
    this.data = Immutable.asMutable(this.props.doiInfo, {deep: true});
    }
    this.manualadd = false;
    this.keycloak = null;
    this.pressed = false;
  }

  componentDidMount() {
    console.log(this.props.keycloak)
    console.log(this.props.authenticated)
    if(!this.props.authenticated){
      const keycloak = Keycloak('/keycloak.json');
      console.log(keycloak)
      keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.props.changeKeycloak(keycloak)
      this.keycloak = this.props.keycloak;
      this.props.changeAuthenticated(authenticated)
    })
  }
  }


  onSubmit(e) {
    e.preventDefault()

    const doiObject = {
      doi: this.state.doi
    };
    console.log(doiObject)
    this.props.requestDoiInfo(doiObject);
    this.data = Immutable.asMutable(this.props.doiInfo, {deep: true});
    console.log(this.data)
    this.pressed = true
    this.props.changeLoading(true);
  }

  onContinue(e){
    e.preventDefault()
    var data = this.props.doiInfo;
    const dataObject = {
      data: data
    }
    this.props.postPubAction(dataObject)
    this.props.history.push('/');
    this.props.changeDoiInfo([]);
  }

  onCancel(e){
    this.props.changeDoiInfo([]);
    this.props.history.push('/');
    this.props.setFailure(false)
  }


  render() {
    
    if (this.pressed == false && this.props.doiInfo.length == 0){
      this.props.changeLoading(false);
    }
    if (this.pressed == true && this.props.doiInfo.length == 0){
      this.props.changeLoading(true);
    }
    if (this.pressed == true && this.props.doiInfo.length > 0){
      this.props.changeLoading(false);
      this.pressed = false
    }

    if(this.props.doiFailure){
      this.props.changeLoading(false);
      this.pressed = false
    }
    
    console.log(this.props.keycloak)
    console.log(this.props.authenticated)
    //if(this.keycloak) {
      if(this.props.authenticated) return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar style={{ background: '#2E3B55' }}
              title="Add a Publication"
            />
             <form onSubmit={this.onSubmit}>
            <br />
            <div className = "doi-width">
            <TextField
              name="DOI"
              label="Enter a DOI"
              fullWidth = {true}
              onChange={(event) => this.setState({ doi: event.target.value})}
            />
            </div>
            <br />
            <Spinner loading={this.props.loading} className="spinner" size={100} />
            {this.props.doiInfo.length > 0  && <UserInfo></UserInfo>}
            {this.props.doiFailure && <p>No Information Found</p>}
            <br/>
            {this.props.doiInfo.length == 0  &&<Button variant="contained" color = "primary" onClick={(event) => this.onSubmit(event)}>Submit</Button>}
            {this.props.doiInfo.length == 9  &&  <Button  variant="contained" color = "primary" onClick={(event) => this.onContinue(event)}>Continue with Submission</Button>}
            {this.props.doiInfo.length == 10  &&  <Button  variant="contained" color = "primary" onClick={(event) => this.onContinue(event)}>Edit Publication Information</Button>}
            </form>
            <br />
            <p>OR</p>
            <Link to="/manualadd">
              <Button variant="contained" color = "primary">Enter Manually</Button>
            </Link>
            <div className="divider"/>
            <Button variant="contained" color = "primary" onClick={(event) => this.onCancel(event)} >Cancel</Button>
          </div>
        </MuiThemeProvider>
      </div>
    ); else return (<div>Authenticating...</div>)
  //}
  return (
    <div>Initializing Keycloak...</div>
  );
  }
}
const style = {
  margin: 15,
};


function mapStateToProps(state) {
  return {
    doiInfo: selectors.getDoiInfo(state),
    loading: selectors.getLoading(state),
    keycloak: selectors.getKeycloak(state),
    authenticated: selectors.getAunthenticated(state),
    doiFailure: selectors.getFailure(state)

  };
}

function mapDispatchToProps(dispatch) {
  return {
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub)),
    requestDoiInfo: (newPub) => dispatch(actions.requestDoiInfo(newPub)),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),
    changeKeycloak: (val) => dispatch(actions.changeKeycloak(val)),
    changeAuthenticated: (val) => dispatch(actions.changeAuthenticated(val)),
    changeDoiInfo: (val) => dispatch(actions.changeDoiInfo(val)),
    setFailure: (val) => dispatch(actions.setFailure(val))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);

