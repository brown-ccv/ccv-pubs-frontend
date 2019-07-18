import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import * as actions from '../actions'
import Spinner from './Spinner';
import PubsTable from './PubsTable';


export class ContentPage extends Component {


  constructor(props) {
    super(props);

    this.state = {data: []};

    if (this.props.publications.length === 0)
      this.props.fetchData();


      this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(event) {
    this.props.changeError(event.target.value);

    event.preventDefault();
  }



  render(){

    if (this.props.publications.length != 0){
      this.props.changeLoading(false)
    }

    return(

      <div>
        <b className="pub-title">Publications</b>

        <Spinner loading={this.props.loading} className="spinner" size={100} />

        <PubsTable publications={this.props.publications}   />

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    publications: selectors.getData(state),
    error: selectors.getError(state),
    loading: selectors.getLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeError: (val) => dispatch(actions.changeError(val)),
    fetchData: () => dispatch({ type: 'FETCH_DATA', payload:'' }),
    changeLoading: (val) => dispatch(actions.changeLoading(val))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
