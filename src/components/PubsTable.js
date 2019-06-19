import ReactTable from 'react-table'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../reducer'
import * as actions from '../actions'
import 'react-table/react-table.css'

export default class PubsTable extends React.Component {

render() {
  const data = this.props.publications;

  const columns = [{
    Header: 'Title',
    accessor: 'title'
  }, {
    Header: 'Author',
    accessor: 'author',
  },
{
    Header: 'Year',
    accessor: 'year'
}]

  return <ReactTable
    data={data}
    columns={columns}
  />
}
}
