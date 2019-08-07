import ReactTable from 'react-table'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../reducer'
import * as actions from '../actions'
import 'react-table/react-table.css'
import Immutable from 'seamless-immutable';


export default class PubsTable extends React.Component {


render() {
  var data = Immutable.asMutable(this.props.publications);
  // var newData = [...data];
  //
  // for(let i =0; i < newData.length; i++){
  //   let newPub = Immutable.asMutable(newData[i])
  //   newPub.formattedURL = `<a href=${newData[i].url}>${newData[i].url}</a>`;
  //   newData[i] = newPub
  // }

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
    width: 100
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
    data={data}
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

  />
}
}
