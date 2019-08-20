import ReactTable from 'react-table'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../reducer'
import * as actions from '../actions'
import 'react-table/react-table.css'
import Immutable from 'seamless-immutable';
import _ from 'lodash';



export class PubsTable extends React.Component {

  constructor(props) {
    super(props);

    this.data = Immutable.asMutable(this.props.publications);
  }

  render() {


    var filteredData = [];

    if (this.props.selectYear !== null) {
      filteredData = _.filter(this.data, (pub) => parseInt(pub.year) === parseInt(this.props.selectYear) )
    } else {
      filteredData = this.data
    }

    const changetoHTML = (url) =>  <a href={url.value}>{url.value}</a>

    const columns = [{
      Header: 'Title',
      accessor: 'title',
      style:{ 'whiteSpace': 'unset'}

    }, {
      Header: 'Authors',
      accessor: 'author',
      style:{ 'whiteSpace': 'unset'}
    },
    {
      Header: 'Year',
      accessor: 'year',
      width: 100,
    },
    {
      Header: 'URL',
      accessor:'url',
      Cell: (val) => changetoHTML(val)
    }]

    function filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;

      return (
          row[id] !== undefined ?
              String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true
      );
    }


    return <ReactTable
      data={filteredData}
      columns={columns}
      filterable
      defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row) }
      defaultSorted={[
          {
            id: 'year',
            desc: true
          }
        ]}
      classname = "-striped -highlight"
      resolveData={data => data.map(row => row)}
      defaultPageSize = {5}
    />
  }

}

function mapStateToProps(state) {
  return {
    selectYear: selectors.getSelectYear(state)

  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelectYear: (val) => dispatch(actions.changeError(val)),
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(PubsTable);
