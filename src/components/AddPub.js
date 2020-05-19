import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import ManualAdd from './ManualAdd';
import Immutable from 'seamless-immutable';
import UserInfo from './UserInfo';
import Spinner from './Spinner';


export class AddPub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doi: '',
      pressed: false
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
            <Spinner loading={this.props.loading} className="spinner" size={100} />
            {this.props.doiInfo.length > 0  && <UserInfo></UserInfo>}
            {this.props.doiInfo.length == 0  &&<RaisedButton  label="Submit" primary={true} style={style} onClick={(event) => this.onSubmit(event)} />}
            {this.props.doiInfo.length > 0  && <RaisedButton  label="Continue with Submission" primary={true} style={style} onClick={(event) => this.onContinue(event)} />}
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
    doiInfo: selectors.getDoiInfo(state),
    loading: selectors.getLoading(state),
    

  };
}

function mapDispatchToProps(dispatch) {
  return {
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub)),
    //fetchDoiInfo: (newPub) => dispatch(actions.fetchDoiInfo(newPub))
    requestDoiInfo: (newPub) => dispatch(actions.requestDoiInfo(newPub)),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);

