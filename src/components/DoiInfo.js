import React, { Component } from 'react';
import Immutable from 'seamless-immutable';
import * as selectors from '../reducer';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Col, Row, Form } from 'react-bootstrap';

/**
 * Component responsible for holding information from doi queries as well as manually adds
 * to the database.
 *
 * If using DOI, the info will be prepopulated, but editable.
 * If using manual add, all textfields will be empty.
 */
export class DoiInfo extends Component {
  constructor(props) {
    super(props);
    this.dataObject = Immutable.asMutable(this.props.doiInfo, { deep: true });
    this.data = this.dataObject['data'];
    for (let value in this.data) {
      if (this.data[value] === 'Missing') {
        this.data[value] = '';
      }
    }
  }

  /**
   * On change to a text field in the form, update the field to be edited
   * in Doi Info prop.
   */
  onTextChange(key, event) {
    var newData = Immutable.asMutable(this.props.doiInfo, { deep: true });
    newData['data'][key] = event.target.value;
    const dataObject = {
      data: newData['data'],
      status: newData['status'],
      abstract: newData['abstract'],
    };
    this.props.updateDoiInfo(dataObject);
  }

  render() {
    return (
      <div className="DoiInfo">
        {this.dataObject['status'] === 'new' && <h3>We found this information from the DOI:</h3>}
        {this.dataObject['status'] === 'old' && (
          <h2>This publication already exists in the database with the following info: </h2>
        )}
        <div className="manAdd-width">
          <Form className="DoiForm">
            <Form.Group as={Row} controlId="title">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="title"
                  placeholder="Enter Title"
                  defaultValue={this.data['title']}
                  onChange={this.onTextChange.bind(this, 'title')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Author(s)
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="author"
                  placeholder="Enter Author(s) names (ex. John Smith, Jane Doe, ...)"
                  defaultValue={this.data['author']}
                  onChange={this.onTextChange.bind(this, 'author')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Publisher
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="publisher"
                  placeholder="Enter Publisher"
                  defaultValue={this.data['publisher']}
                  onChange={this.onTextChange.bind(this, 'publisher')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Volume
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="volume"
                  placeholder="Enter Volume"
                  defaultValue={this.data['volume']}
                  onChange={this.onTextChange.bind(this, 'volume')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                URL
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="url"
                  placeholder="Enter URL"
                  defaultValue={this.data['url']}
                  onChange={this.onTextChange.bind(this, 'url')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                DOI
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="doi"
                  id="doi"
                  required
                  placeholder="Enter DOI"
                  defaultValue={this.data['doi']}
                  onChange={this.onTextChange.bind(this, 'doi')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Month of Publication
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  id="month"
                  placeholder="Enter Month (ex. 5)"
                  defaultValue={this.data['month']}
                  onChange={this.onTextChange.bind(this, 'month')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Year of Publication
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  id="year"
                  type="year"
                  placeholder="Enter Year (ex. 2000)"
                  defaultValue={this.data['year']}
                  onChange={this.onTextChange.bind(this, 'year')}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Abstract
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="abstract"
                  placeholder="Enter Abstract"
                  as="textarea"
                  rows="3"
                  defaultValue={this.data['abstract']}
                  onChange={this.onTextChange.bind(this, 'abstract')}
                />
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DoiInfo);
