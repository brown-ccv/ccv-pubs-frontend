import ReactTable from "react-table";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as selectors from "../reducer";
import * as actions from "../actions";
import "react-table/react-table.css";
import Immutable from "seamless-immutable";
import _ from "lodash";

export class PubsTable extends React.Component {
  constructor(props) {
    super(props);

    this.data = Immutable.asMutable(this.props.publications);
  }

  render() {
    var filteredData = [];

    if (this.props.selectYear !== null) {
      console.log(this.props.selectYear);
      filteredData = _.filter(
        this.data,
        (pub) => parseInt(pub.year) === parseInt(this.props.selectYear)
      );
      console.log(filteredData);
      this.data = filteredData;
    } else {
      console.log("no word");
      this.data = Immutable.asMutable(this.props.publications);
    }

    console.log(this.props.selectWord);
    function findAbstracts(word, data) {
      var matches = [];
      for (var index of word) {
        matches.push(data[index]);
      }
      return matches;
    }

    if (Array.isArray(this.props.selectWord)) {
      console.log("here");
      filteredData = findAbstracts(this.props.selectWord, this.data);
      console.log(filteredData);
    } else {
      filteredData = this.data;
    }

    const changetoHTML = (url) => <a href={url.value}>{url.value}</a>;

    const columns = [
      {
        Header: "Title",
        accessor: "title",
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Authors",
        accessor: "author",
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Year",
        accessor: "year",
        width: 100,
      },
      {
        Header: "URL",
        accessor: "url",
        Cell: (val) => changetoHTML(val),
        filterable: false,
      },
    ];

    function filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;

      return row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true;
    }

    return (
      <ReactTable
        data={filteredData}
        columns={columns}
        filterable
        defaultFilterMethod={(filter, row) =>
          filterCaseInsensitive(filter, row)
        }
        defaultSorted={[
          {
            id: "year",
            desc: true,
          },
        ]}
        classname="-striped -highlight"
        resolveData={(data) => data.map((row) => row)}
        defaultPageSize={5}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    selectYear: selectors.getSelectYear(state),
    selectWord: selectors.getSelectWord(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelectYear: (val) => dispatch(actions.changeError(val)),
    changeSelectWord: (val) => dispatch(actions.changeError(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PubsTable);
