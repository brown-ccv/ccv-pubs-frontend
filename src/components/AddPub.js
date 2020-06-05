import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import {Navbar, Nav, Button, FormControl} from 'react-bootstrap'
import { Link } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import * as selectors from "../reducer";
import Immutable from "seamless-immutable";
import DoiInfo from "./DoiInfo";
import Spinner from "./Spinner";
import Keycloak from "keycloak-js";
import Form from 'react-bootstrap/Form';

export class AddPub extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, profile: null, iscis: false };
    const newDoiInfo = {
      data : [],
      status: "empty"
    }
    this.props.changeDoiInfo(newDoiInfo);
    this.doi = "";
    this.manualadd = false;
    this.keycloak = null;
    this.pressed = false;
    this.manual = false;
    this.full = true;
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      //in the example I was following they would check if a keycloak user id was entered and
      //and then display a different message if they were authenticated. I tried this, however, on
      //submit the keycloak prop was undefined
      const keycloak = Keycloak("/keycloak.json");
      keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
        this.props.changeKeycloak(keycloak);
        this.keycloak = this.props.keycloak;
        this.props.changeAuthenticated(authenticated);
        console.log(keycloak)
        console.log(authenticated)
      }).catch((error) => console.log(error));
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFailure(false);
    const newDoiInfo = {
      data : {},
      status: "empty"
    }
    this.props.changeDoiInfo(newDoiInfo);
    const doiObject = {
      doi: this.doi,
    };
    this.props.requestDoiInfo(doiObject);
    this.data = Immutable.asMutable(this.props.doiInfo, { deep: true });
    this.pressed = true;
    this.props.changeLoading(true);
    this.manual = false
  }

  onContinue(e) {
    this.full = true
    var values = []
    e.preventDefault();
    var data = this.props.doiInfo;
    const dataObject = {
      data: data,
    };

    for (var key in data["data"]){
      if (data["data"][key] != null && data["data"][key] != ""){
        console.log(data["data"][key])
        values.push(data["data"][key])
        break;
      }
    }

    if(values.length == 0){
      this.full = false
      this.forceUpdate();
    }
    console.log(this.full)
    if (this.full){
      this.props.changeLoading(true);
      this.props.postPubAction(dataObject);
    }
  }

  onCancel(e) {
    const newDoiInfo = {
      data : {},
      status: "empty"
    }
    this.props.changeDoiInfo(newDoiInfo);
    this.props.history.push("/");
    this.props.setFailure(false);
    this.props.changeAddSuccess(false);
  }

  onManual(e){
    const newDoiInfo = {
      data : {title: null, author: null, publisher: null, doi: null, url: null, abstract: null, volume: null, month: null, year:null},
      status: "empty"
    }
    this.props.setFailure(false);
    this.data = []
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = true;
  }

  onDOI(e){
    const newDoiInfo = {
      data : {},
      status: "empty"
    }
    this.props.setFailure(false);
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = false;
    this.props.changeAddSuccess(false);
  }

  onLogout(e){
    const newDoiInfo = {
      data : {},
      status: "empty"
    }
    this.props.setFailure(false);
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = false;
    this.props.changeAddSuccess(false);
    this.props.history.push("/");
    this.props.keycloak.logout();
  }

  render() {
    console.log(this.props.doiInfo["status"])
    console.log(this.props.doiInfo["status"] === "empty")
    console.log(this.manual)
    console.log(this.props.addSuccess)
    if (!this.manual && !this.pressed && this.props.doiInfo["status"] == "empty") {
      this.props.changeLoading(false);
    }
    if (this.pressed && this.props.doiInfo["status"] === "empty") {
      this.props.changeLoading(true);
    }
    if (this.pressed && this.props.doiInfo["status"] !== "empty") {
      this.props.changeLoading(false);
      this.pressed = false;
    }

    if(this.props.addSuccess){
      this.props.changeLoading(false);
    }

    if (this.props.doiFailure) {
      this.props.changeLoading(false);
      this.pressed = false;
    }

    if (this.props.authenticated)
      return (
        <div>
          <MuiThemeProvider>
            <div>
              
              <Navbar bg = "primary" >
                <div className = "container">
               <Nav className="justify-content-center" >
                 <Nav.Item>
              <Navbar.Brand>Add a Publication</Navbar.Brand>
              </Nav.Item>
              </Nav>
              </div>
             <Form inline>
             <Nav className="ml-auto">
              <Button variant="outline-primary" onClick={(event) => this.onLogout(event)}>Logout</Button>
              </Nav>
              </Form>
             
              </Navbar>
              {/* <form onSubmit={this.onSubmit}> */}
              {!this.props.addSuccess && <div>
                <br />
                {!this.manual && <div className="doi-width">
                  
                  <Form>
                    <Form.Group controlId = "doientry">
                    <Form.Label>Please enter a DOI or DOI URL</Form.Label>
                    <Form.Control type="doi" 
                      placeholder="Enter DOI or URL" 
                      onChange={(event) => {
                        this.doi = event.target.value;
                      }}/>
                    </Form.Group>
                  </Form>
                
                <br />
                <Spinner
                  loading={this.props.loading}
                  className="spinner"
                  size={100}
                />
                {(
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onSubmit(event)}
                  >
                    Submit
                  </Button>
                )}
                </div>}
                <br /> <br/>
                {(this.props.doiInfo["status"] !== "empty" && this.props.doiInfo["status"] !== "not found") && <DoiInfo></DoiInfo>}
                {this.manual &&  <DoiInfo></DoiInfo>}
                {this.props.doiFailure && <p>No Information Found</p>}
                <br />
                
                {this.props.doiInfo["status"] === "new" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onContinue(event)}
                  >
                    Continue with Submission
                  </Button>
                )}
                {this.props.doiInfo["status"] === "old" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onContinue(event)}
                  >
                    Insert Edited Publication Information
                  </Button>
                )}
                {this.manual && !this.full && <p>Please enter information in one or more of the fields</p>}
              {this.manual && ( <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onContinue(event)}
                  >
                    Submit
                  </Button>
                  <Spinner
                  loading={this.props.loading}
                  className="spinner"
                  size={100}
                />
                </div>
                )}
                
              <br /> <br/>
              <p>OR</p>
              {/* <Link to="/doiinfo"> */}
                {!this.manual && <Button variant="contained" color="primary" onClick={(event) => this.onManual(event)}>
                  Enter Manually
                </Button>}
              {this.manual && <Button variant="contained" color="primary" onClick={(event) => this.onDOI(event)}>
                  Enter DOI
                </Button>}
              <div className="divider" />
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.onCancel(event)}
              >
                Back to Home
              </Button>
              </div>}

             { this.props.addSuccess && <div>
              <h1>Success!</h1>
              <br/>
              <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onDOI(event)}
                  >
                    Insert Another Publication
                  </Button>
                  <div className="divider" />
              <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onCancel(event)}
                  >
                    Back to Home
                  </Button>
              </div>}

            </div>
          </MuiThemeProvider>
        </div>
      );
    else return <div>Authenticating...</div>;
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
    doiFailure: selectors.getFailure(state),
    addSuccess: selectors.getAddSuccess(state)
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
    setFailure: (val) => dispatch(actions.setFailure(val)),
    changeAddSuccess: (val) => dispatch(actions.changeAddSuccess(val))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);
