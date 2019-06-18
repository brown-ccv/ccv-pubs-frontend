import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import * as actions from '../actions'
import Spinner from './Spinner';
import PubsTable from './PubsTable';

export class ContentPage extends Component {

  constructor(props) {
    super(props);

    if (this.props.publications.length === 0) this.props.fetchData();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.changeError(event.target.value);

    event.preventDefault();
  }

  render(){

    return(
      <div>
        <p>I am your app</p>

        <p>I am loading forever</p>

        <Spinner loading={true} className="spinner" size={100} />

        <PubsTable onFetchData={() => this.props.fetchData()} manual/>



      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    publications: selectors.getData(state),
    error: selectors.getError(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeError: (val) => dispatch(actions.changeError(val)),
    fetchData: () => dispatch({ type: 'FETCH_DATA', payload:'' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
