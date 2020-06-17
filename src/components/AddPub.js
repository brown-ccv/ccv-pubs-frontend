import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import * as actions from "../actions";
import { connect } from "react-redux";
import * as selectors from "../reducer";
import Immutable from "seamless-immutable";
import DoiInfo from "./DoiInfo";
import Spinner from "./Spinner";
import Keycloak from "keycloak-js";
import Form from "react-bootstrap/Form";

export class AddPub extends Component {
  constructor(props) {
    super(props);
    const newDoiInfo = {
      data: {},
      status: "empty",
    };
    this.props.changeDoiInfo(newDoiInfo);
    this.doi = "";
    this.pressed = false;
    this.manual = false;
    this.full = true;
  }

  componentDidMount() {
    /**
     * User is authenticated as a member of CIS when routed to AddPub component. User is
     * only authenticated once when using the app, unless they have logged out. 
     */
    if (!this.props.keycloak["authenticated"]) {
      var temp = Immutable.asMutable(this.props.keycloak, { deep: true });
      const keycloak = Keycloak("../keycloak.json");
      keycloak
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
          temp["keycloak"] = keycloak;
          temp["authenticated"] = authenticated;
          this.props.changeKeycloak(temp);
          keycloak
            .loadUserProfile()
            .then((profile) => {
              temp["profile"] = profile;
              this.props.changeKeycloak(temp);
            })
            .catch((err) => console.log(err));
          let hasRole = keycloak.hasRealmRole("cis-all-role");
          temp["iscis"] = hasRole;
          this.props.changeKeycloak(temp);
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * When a user submits a DOI for fetch from CrossRef API. Erases 
   * current DOI info if there is any and requests info.
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.setFailure(false);
    const newDoiInfo = {
      data: {},
      status: "empty",
    };
    this.props.changeDoiInfo(newDoiInfo);
    const doiObject = {
      doi: this.doi,
    };
    this.props.requestDoiInfo(doiObject);
    this.data = Immutable.asMutable(this.props.doiInfo, { deep: true });
    this.pressed = true;
    this.props.changeLoading(true);
    this.manual = false;
    this.props.changeError(null)
  }

  /**
   * Called after a user recieves the information from the requested DOI and has
   * had the oppurtunity to edit before submitting to be added to the database or 
   * elected to submit manually.
   * 
   * If submitting manually, doi and title must be specified 
   */
  onContinue(e) {
    e.preventDefault();
    var data = this.props.doiInfo;
    const dataObject = {
      data: data,
    };

    if (
      data["data"]["doi"] !== null &&
      data["data"]["doi"] !== "" &&
      data["data"]["title"] !== null &&
      data["data"]["title"] !== ""
    ) {
      this.full = true;
    } else {
      this.full = false;
      this.forceUpdate();
    }

    if (this.full) {
      this.props.changeLoading(true);
      this.props.postPubAction(dataObject);
    }
  }

  /**
   * Called when "Back to Home button is pressed"
   */
  onCancel(e) {
    const newDoiInfo = {
      data: {},
      status: "empty",
    };
    this.props.changeDoiInfo(newDoiInfo);
    this.props.history.push("/");
    this.props.setFailure(false);
    this.props.changeAddSuccess(false);
  }

  /**
   * When a user elects to add a publication manually,
   * the previous doi info (if any) is cleared
   */
  onManual(e) {
    const newDoiInfo = {
      data: {
        title: null,
        author: null,
        publisher: null,
        doi: null,
        url: null,
        abstract: null,
        volume: null,
        month: null,
        year: null,
      },
      status: "empty",
    };
    this.props.setFailure(false);
    this.data = [];
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = true;
  }

  /**
   * When a user elects to enter a DOI after previosly pressing 
   * "enter manually". 
   */
  onDOI(e) {
    const newDoiInfo = {
      data: {},
      status: "empty",
    };
    this.props.setFailure(false);
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = false;
    this.props.changeAddSuccess(false);
  }

  /**
   * When a user logs out everything in props is reset and
   * any class variables are reverted back to oringinal state
   */
  onLogout(e) {
    const newDoiInfo = {
      data: {},
      status: "empty",
    };
    this.props.setFailure(false);
    this.props.changeDoiInfo(newDoiInfo);
    this.manual = false;
    this.props.changeAddSuccess(false);
    this.props.history.push("/");
    this.props.keycloak["keycloak"].logout();
  }

  render() {
    //nothing to be loaded
    if (
      !this.manual &&
      !this.pressed &&
      !this.props.error && 
      this.props.doiInfo["status"] === "empty"
    ) {
      this.props.changeLoading(false);
    }
    //user has submitted a doi, start loading
    if (!this.props.error && this.pressed && this.props.doiInfo["status"] === "empty") {
      this.props.changeLoading(true);
    }
    //user got response from doi query, loading is false
    if (!this.props.error && this.pressed && this.props.doiInfo["status"] !== "empty") {
      this.props.changeLoading(false);
      this.pressed = false;
    }
    //user successfully added publication to database
    if (!this.props.error && this.props.addSuccess) {
      this.props.changeLoading(false);
    }
    //no information could be retrieved from the DOI query, loading is false
    if (!this.props.error && this.props.doiFailure) {
      this.props.changeLoading(false);
      this.pressed = false;
    }
    if(this.props.error){
      this.props.changeLoading(false);
    }
    //main div is only displayed if user is authenticated by shib and in CIS group
    if (this.props.keycloak["keycloak"]) {
      if (this.props.keycloak["authenticated"]) {
        if (this.props.keycloak["iscis"]) {
          if (this.props.keycloak["profile"]) {
        return (
          <div>
            <div>

              <Navbar bg="primary">
                
                    <Navbar.Brand className="navbar-brand-custom">
                      Add a Publication
                    </Navbar.Brand>
                  
                <Nav className="ml-auto mr-1">
                  <Nav.Item>
                    <Button
                      variant="outline-primary"
                      onClick={(event) => this.onLogout(event)}
                    >
                      Logout
                    </Button>
                  </Nav.Item>
                </Nav>
              </Navbar>

              {!this.props.addSuccess && (
                <div>
                  <br />
                  {!this.manual && (
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
                      <Spinner
                        loading={this.props.loading}
                        className="spinner"
                        size={100}
                      />
                      {
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) => this.onSubmit(event)}
                        >
                          Submit
                        </Button>
                      }
                    </div>
                  )}
                  <br /> <br />
                  {this.props.doiInfo["status"] !== "empty" &&
                    this.props.doiInfo["status"] !== "not found" && (
                      <DoiInfo></DoiInfo>
                    )}
                  {this.manual && <DoiInfo></DoiInfo>}
                  {this.props.doiFailure && <p>No Information Found</p>}
                  {this.props.error && <div className = "error-text">
                    <h1>{this.props.error}</h1>
                  </div>}
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
                  {this.manual && !this.full && (
                    <p>Please enter at least DOI and Title</p>
                  )}
                  {this.manual && (
                    <div>
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
                  <br /> <br />
                  <p>OR</p>
                  {/* <Link to="/doiinfo"> */}
                  {!this.manual && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => this.onManual(event)}
                    >
                      Enter Manually
                    </Button>
                  )}
                  {this.manual && (
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
              )}

              {this.props.addSuccess && (
                <div>
                  <h1>Success!</h1>
                  <br />
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
                </div>
              )}
            </div>
          </div>
        );
          } else {
            return (<div>Loading Profile</div>)
          }
        } else {

          return (<div className = "cis-false">
          <div>Only members of CIS can do this - <a href = "mailto:support@ccv.brown.edu">open a ticket </a>to request your publication be added</div>
              </div>
            )
        }
      } else {
        return <div>Unable to authenticate!</div>;
      }
    }
    return <div>Initializing Keycloak...</div>;
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPub);
