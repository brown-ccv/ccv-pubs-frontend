import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';

export class AddPub extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      author:'',
      publisher:'',
      pub_year: '',
      pub_month: '',
      volume: '',
      URL: '',
      doi: '',
    //   manual: false
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar style={{ background: '#2E3B55' }}
             title="Add a Publication"
           />
             <br/>
           <TextField
             hintText="Enter the doi"
             floatingLabelText="Title"
             onChange = {(event,newValue) => this.setState({title:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter the doi"
             floatingLabelText="DOI"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
             <TextField
             hintText="Enter the doi"
             floatingLabelText="Author"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
             <TextField
             hintText="Enter the doi"
             floatingLabelText="Publisher"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
             <TextField
             hintText="Enter the doi"
             floatingLabelText="Year of Publication"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
             <TextField
             hintText="Enter the doi"
             floatingLabelText="Month of Publication"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
             <TextField
             hintText="Enter the doi"
             floatingLabelText="Volume"
             onChange = {(event,newValue) => this.setState({doi:newValue})}
             />
             <br/>
           <RaisedButton style={{ background: '#2E3B55' }} label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           <Link to = "/">
           <RaisedButton style={{ background: '#2E3B55' }} label="Cancel" primary={true} style={style} />
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