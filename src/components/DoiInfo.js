import React, { Component } from "react";
import Immutable from "seamless-immutable";
import { getDoiInfo } from "../reducer";
import * as selectors from "../reducer";
import { connect } from "react-redux";
import * as actions from "../actions";
import TextField from "@material-ui/core/TextField";
import { Col, Row, Form } from "react-bootstrap";


export class DoiInfo extends Component {
  constructor(props) {
    super(props);
    this.dataObject = Immutable.asMutable(this.props.doiInfo, { deep: true });
    this.data = this.dataObject["data"]
    var i;
    for (let value in this.data){
      if (this.data[value] == "Missing") {
        this.data[value] = '';
      }
    }
    console.log(this.data)
  }

  onTextChange(key, event){
    console.log(event.target.value)
    console.log(key)
    var newData = Immutable.asMutable(this.props.doiInfo, { deep: true });
    console.log(newData)
    newData["data"][key] = event.target.value
    console.log(newData)
    const dataObject = {
      data: newData["data"],
      status: newData["status"]
    }

    this.props.updateDoiInfo(dataObject)
    console.log(this.props.doiInfo)
  }

  render() {
    console.log(this.props.doiInfo["data"])
    return (
      <div className="DoiInfo">
        {this.dataObject["status"] == "new" && (
          <h3>We found this information from the DOI:</h3>
        )}
        {this.dataObject["status"] == "old" && (
          <h2>
            This publication already exists in the database with the following
            info:{" "}
          </h2>
        )}
        <div className="manAdd-width">
            <Form>
              <Form.Group as={Row} controlId = "title">
                <Form.Label column sm="2">Title</Form.Label>
                <Col sm={10}>
                <Form.Control type="title" 
                    placeholder="Enter Title" 
                    defaultValue = {this.data["title"]}
                    onChange={this.onTextChange.bind(this, "title")}/>
                </Col>

                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Author(s)</Form.Label>
                <Col sm={10}>
                <Form.Control type="author" 
                    placeholder="Enter Author(s) names comma separated" 
                    defaultValue = {this.data["author"]}
                    onChange={this.onTextChange.bind(this, "author")}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Publisher</Form.Label>
                <Col sm={10}>
                <Form.Control type="publisher" 
                    placeholder="Publisher" 
                    defaultValue = {this.data["publisher"]}
                    onChange={this.onTextChange.bind(this, "publisher")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Volume</Form.Label>
                <Col sm={10}>
                <Form.Control type="volume" 
                    placeholder="Volume" 
                    defaultValue = {this.data["volume"]}
                    onChange={this.onTextChange.bind(this, "volume")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">URL</Form.Label>
                <Col sm={10}>
                <Form.Control type="url" 
                    placeholder="URL" 
                    defaultValue = {this.data["url"]}
                    onChange={this.onTextChange.bind(this, "url")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">DOI</Form.Label>
                <Col sm={10}>
                <Form.Control type="doi" 
                    placeholder="DOI" 
                    defaultValue = {this.data["doi"]}
                    onChange={this.onTextChange.bind(this, "doi")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Month of Publication</Form.Label>
                <Col sm={10}>
                <Form.Control 
                    placeholder="Month" 
                    defaultValue = {this.data["month"]}
                    onChange={this.onTextChange.bind(this, "month")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Year of Publication</Form.Label>
                <Col sm={10}>
                <Form.Control type="year" 
                    placeholder="Year" 
                    defaultValue = {this.data["year"]}
                    onChange={this.onTextChange.bind(this, "year")}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                <Form.Label column sm="2">Abstract</Form.Label>
                <Col sm={10}>
                <Form.Control type="abstract" 
                    placeholder="Abstract"
                    as="textarea" rows="3" 
                    defaultValue = {this.data["abstract"]}
                    onChange={this.onTextChange.bind(this, "abstract")}/>
                    </Col>
                </Form.Group>
              </Form>
          <br />
         
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
export default connect(mapStateToProps, mapDispatchToProps)(DoiInfo);
