import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
export class AddPub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doi: ''
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

    axios.post('http://localhost:8080/addPublications', doiObject)
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      });

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
export default AddPub;