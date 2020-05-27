import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link,  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class ManualAdd extends Component {
  constructor(props){
    super(props);
    this.newData =["Missing", "Missing", "Missing", "Missing", "Missing", "Missing", "Missing", "Missing", "Missing"];
  }

  handleClick(event){
    this.props.updateDoiInfo(this.newData)
    const dataObject = {
      data: this.newData
    }
    this.props.postPubAction(dataObject)
  }

  handleCancel(event){
    this.props.updateDoiInfo([])
    this.props.history.push('/addPub');

  }

  render() {
    this.data = this.props.doiInfo;
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar style={{ background: '#2E3B55' }}
             title="Add a Publication"
           />
             <br/>
             <div className = "manAdd-width">
             <TextField
          id="standard-helperText"
          label="Title"
          name = "Title"
          fullWidth = {true}
          onChange = {(event) => (this.newData[5] = event.target.value)}
        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Author"
          name = "Author"
          fullWidth = {true}
          onChange = {(event) => (this.newData[0] = event.target.value)}
        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Publisher"
          name = "Publisher"
          fullWidth = {true}
          onChange = {(event) => (this.newData[1] = event.target.value)}
        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Volume"
          name = "Volume"
          fullWidth = {true}
          onChange = {(event) => (this.newData[2] = event.target.value)}

        />
                <br/>

        <TextField
          id="standard-helperText"
          label="URL"
          name = "URL"
          fullWidth = {true}
          onChange = {(event) => (this.newData[3] = event.target.value)}

        />
                <br/>

        <TextField
          id="standard-helperText"
          label="DOI"
          name = "DOI"
          fullWidth = {true}
          onChange = {(event) => (this.newData[4] = event.target.value)}

        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Month"
          name = "Month"
          fullWidth = {true}
          onChange = {(event) => (this.newData[6] = event.target.value)}

        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Year"
          name = "Year"
          fullWidth = {true}
          onChange = {(event) => (this.newData[7] = event.target.value)}

        />
                <br/>

        <TextField
          id="standard-helperText"
          label="Abstract"
          name = "Abstract"
          multiline
          fullWidth = {true}
          onChange = {(event) => (this.newData[8] = event.target.value)}
        />
        </div>
                        <br/>
           <Button style={{ background: '#2E3B55' }}  variant="contained" color = "primary" style={style} onClick={(event) => this.handleClick(event)}>Submit</Button> 
           <Button style={{ background: '#2E3B55' }}   variant="contained" color = "primary" style={style} onClick={(event) => this.handleCancel(event)}> Cancel </Button>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

function mapDispatchToProps(dispatch) {
  return {
    updateDoiInfo: (newPub) => dispatch(actions.changeDoiInfo(newPub)),
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub))

  };
}
export default connect(null, mapDispatchToProps)(ManualAdd);
