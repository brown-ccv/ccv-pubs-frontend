import React from 'react';
import { Vega } from 'react-vega';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { selectPublications } from '../store/slice/appState';
export function YearChart() {
  const [selectedYear, setSelectedYear] = React.useState(null);
  const publications = useSelector(selectPublications);

  const sampleSpec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    description: 'Bar Chart of the years of publications',
    width: 400,
    height: 400,
    padding: 5,
    title: {
      text: {
        signal: 'title',
      },
    },

    data: [
      {
        name: 'publications',
        values: cloneDeep(publications),
        transform: [
          {
            type: 'aggregate',
            groupby: ['year'],
          },
        ],
      },
    ],

    signals: [
      {
        name: 'selectedYear',
        value: selectedYear,
        on: [
          {
            events: 'click',
            update: 'datum !== null && selectedYear === null ? datum.year : null',
          },
          {
            events: 'dblclick',
            update: 'null',
          },
        ],
      },
      {
        name: 'title',
        value: 'Number of Publications by Year',
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: {
          data: 'publications',
          field: 'year',
          sort: true,
        },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      {
        name: 'yscale',
        domain: {
          data: 'publications',
          field: 'count',
        },
        nice: true,
        range: 'height',
      },
    ],

    axes: [
      {
        scale: 'xscale',
        orient: 'bottom',
        title: 'Year',
        labelAngle: 270,
        labelAlign: 'right',
        labelBaseline: 'middle',
      },
      {
        scale: 'yscale',
        orient: 'left',
        title: 'Count',
        tickMinStep: 1,
      },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'publications' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'year' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
            tooltip: {
              signal: `{
              "Year": datum.year,
              "Count": datum.count
              }`,
            },
          },
          update: {
            fill: [
              {
                value: '#ffc72c',
                test: 'selectedYear == datum.year',
              },
              {
                value: '#003c71',
              },
            ],
            cursor: {
              value: 'pointer',
            },
          },
          hover: {
            fill: { value: '#00b398' },
          },
        },
      },
    ],

    config: {
      title: {
        fontSize: 24,
      },
      axis: {
        labelFontSize: 16,
        titleFontSize: 20,
      },
    },
  };

  const handleSelectedYear = (name, value) => {
    setSelectedYear(value);
  };

  const signalListeners = { selectedYear: handleSelectedYear };

  return <Vega spec={sampleSpec} signalListeners={signalListeners} actions={false} />;
}
