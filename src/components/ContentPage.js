import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import * as actions from '../actions'
import Spinner from './Spinner';
import PubsTable from './PubsTable';
import YearChart from './YearChart';
import WordCloud from './WordCloud';
import { Button } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';



export class ContentPage extends Component {


  constructor(props) {
    super(props);

    if (this.props.publications.length === 0)
      this.props.fetchData();

    if(this.props.ngrams.length === 0)
      this.props.fetchNgrams();

      this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(event) {
    this.props.changeError(event.target.value);

    event.preventDefault();
  }



  render(){

    if (this.props.publications.length != 0 && this.props.ngrams.length != 0){
      this.props.changeLoading(false)

    }



    return(
      <div>
        <div align="right">
          <Link to="/addPub">
        <Button variant="contained" color = "primary">Add a Publication</Button>
        </Link>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="pub-title pt-2 bg-primary text-white rounded-circle">
          
            <FontAwesomeIcon icon={faBook} />
          </div>
          <h1 className="pl-2">Publications</h1>
        </div>

        <Spinner loading={this.props.loading} className="spinner" size={100} />

        {this.props.publications.length > 0 && <PubsTable publications={this.props.publications} /> }
        

        {this.props.publications.length > 0 && <h3 className="word-cloud-title pt-4 mt-4"> What are these publications all about? </h3>}
        <div className="viz d-flex justify-content-center pt-5">
        <Spinner loading={this.props.loading} className="spinner" size={100} />
        {this.props.ngrams.length > 0 && <WordCloud/> }
        <Spinner loading={this.props.loading} className="spinner" size={100} />
        {this.props.publications.length > 0 && <YearChart/> }
        </div>

      </div>



    );
  }

}

function mapStateToProps(state) {
  return {
    publications: selectors.getData(state),
    error: selectors.getError(state),
    loading: selectors.getLoading(state),
    ngrams : selectors.getNgrams(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeError: (val) => dispatch(actions.changeError(val)),
    fetchData: () => dispatch({ type: 'FETCH_DATA', payload:'' }),
    changeLoading: (val) => dispatch(actions.changeLoading(val)),
    fetchNgrams: () => dispatch({ type: 'FETCH_NGRAMS', payload:'' }),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
