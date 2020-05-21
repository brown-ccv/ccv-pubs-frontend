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
      keycloak: null, 
      authenticated: false
    }
    if(this.props.doiInfo){
    this.data = Immutable.asMutable(this.props.doiInfo, {deep: true});
    }
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
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
    this.setState({pressed : true})
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

  }


  render() {
    
    if (this.state.pressed == false && this.props.doiInfo.length == 0){
      this.props.changeLoading(false);
    }
    if (this.state.pressed == true && this.props.doiInfo.length == 0){
      this.props.changeLoading(true);
    }
    if (this.state.pressed == true && this.props.doiInfo.length > 0){
      this.props.changeLoading(false);
      this.setState({pressed : false})
    }
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
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
            <br/>
            {this.props.doiInfo.length == 0  &&<Button variant="contained" color = "primary" onClick={(event) => this.onSubmit(event)}>Submit</Button>}
            {this.props.doiInfo.length > 0  &&  <Button  variant="contained" color = "primary" onClick={(event) => this.onContinue(event)}>Continue with Submission</Button>}
            </form>
            <br />
            <p>OR</p>
            <Link to="/manualadd">
              <Button variant="contained" color = "primary">Enter Manually</Button>
            </Link>
          </div>
        </MuiThemeProvider>
      </div>
    ); else return (<div>Unable to authenticate!</div>)
  }
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
    

  };
}

function mapDispatchToProps(dispatch) {
  return {
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub)),
    requestDoiInfo: (newPub) => dispatch(actions.requestDoiInfo(newPub)),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);

