import React, { Component } from "react";
import Immutable from "seamless-immutable";
import { getDoiInfo } from "../reducer";
import * as selectors from "../reducer";
import { connect } from "react-redux";
import * as actions from "../actions";
import TextField from "@material-ui/core/TextField";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.data = Immutable.asMutable(this.props.doiInfo, { deep: true });
    var i;
    for (i = 0; i < this.data.length; i++) {
      if (this.data[i] == "Missing") {
        this.data[i] = null;
      }
    }
  }

  render() {
    return (
      <div className="UserInfo">
        {this.data.length < 10 && (
          <h3>We found this information from the DOI:</h3>
        )}
        {this.data.length > 9 && (
          <h2>
            This publication already exists in the database with the following
            info:{" "}
          </h2>
        )}
        <div className="manAdd-width">
          <br />
          <TextField
            id="standard-helperText"
            label="Title"
            defaultValue={this.data[5]}
            name="Title"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 5)
                  .concat([event.target.value], this.props.doiInfo.slice(6))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Author"
            defaultValue={this.data[0]}
            name="Author"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                [event.target.value].concat(this.props.doiInfo.slice(1))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Publisher"
            defaultValue={this.data[1]}
            name="Publisher"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo[0].concat(
                  [event.target.value],
                  this.props.doiInfo.slice(2)
                )
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Volume"
            defaultValue={this.data[2]}
            name="Volume"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 2)
                  .concat([event.target.value], this.props.doiInfo.slice(3))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="URL"
            defaultValue={this.data[3]}
            name="URL"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 3)
                  .concat([event.target.value], this.props.doiInfo.slice(4))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="DOI"
            defaultValue={this.data[4]}
            name="DOI"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 4)
                  .concat([event.target.value], this.props.doiInfo.slice(5))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Month of Publication"
            defaultValue={this.data[6]}
            name="Month"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 6)
                  .concat([event.target.value], this.props.doiInfo.slice(7))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Year of Publication"
            defaultValue={this.data[7]}
            name="Year"
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo
                  .slice(0, 7)
                  .concat([event.target.value], this.props.doiInfo.slice(8))
              )
            }
          />
          <br />

          <TextField
            id="standard-helperText"
            label="Abstract"
            defaultValue={this.data[8]}
            name="Abstract"
            multiline
            fullWidth={true}
            onChange={(event) =>
              this.props.updateDoiInfo(
                this.props.doiInfo.slice(0, 8).concat([event.target.value])
              )
            }
          />
          <br />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    doiInfo: selectors.getDoiInfo(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDoiInfo: (newPub) => dispatch(actions.changeDoiInfo(newPub)),
    postPubAction: (newPub) => dispatch(actions.postPubAction(newPub)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
