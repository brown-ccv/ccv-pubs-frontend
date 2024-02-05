import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css';
import { useSelector } from 'react-redux';
import { selectPublications } from '../store/slice/appState';

export function PubsTable() {
  const publications = useSelector(selectPublications);
  const changetoHTML = (url) => <a href={url.value}>{url.value}</a>;

  const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined && row[id] !== null
      ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
      : false;
  };

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      style: { whiteSpace: 'unset' },
    },
    {
      Header: 'Authors',
      accessor: 'author',
      style: { whiteSpace: 'unset' },
    },
    {
      Header: 'Year',
      accessor: 'year',
      width: 100,
    },
    {
      Header: 'URL',
      accessor: 'url',
      Cell: (val) => changetoHTML(val),
      filterable: false,
    },
  ];

  return (
    <ReactTable
      data={publications}
      columns={columns}
      filterable
      defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
      defaultSorted={[
        {
          id: 'year',
          desc: true,
        },
      ]}
      classname="-striped -highlight"
      resolveData={(data) => data.map((row) => row)}
      defaultPageSize={5}
    />
  );
}
