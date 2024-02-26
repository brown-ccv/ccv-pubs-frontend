import React from 'react';
import { Vega } from 'react-vega';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { selectPublications } from '../store/slice/appState';
import { capitalizeFirstLetter } from '../utils/utils.ts';

export function YearChart() {
  const [selected, setSelected] = React.useState(null);
  const publications = useSelector(selectPublications);

  const dataCollection = selected && selected.year ? 'publicationsByMonth' : 'publicationsByYear';
  const dataField = selected && selected.year ? 'month' : 'year';

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
      },
      {
        name: 'publicationsByYear',
        source: 'publications',
        transform: [
          {
            type: 'aggregate',
            groupby: ['year'],
          },
        ],
      },
      {
        name: 'publicationsByMonth',
        source: 'publications',
        transform: [
          {
            type: 'filter',
            expr: '(select !== null && select.year !== null) ? datum.year === select.year : true',
          },
          {
            type: 'aggregate',
            groupby: ['month'],
          },
        ],
      },
    ],

    signals: [
      {
        name: 'select',
        value: selected,
        on: [
          {
            events: 'click',
            update: 'select ? null : datum',
          },
          {
            events: 'dblclick',
            update: 'null',
          },
        ],
      },
      {
        name: 'title',
        value: 'Number of Publications vs Year',
        update:
          "select && select.year ? 'Number of Publications vs Month' + ' (' + select.year + ')' : 'Number of Publications vs Year'",
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: {
          data: dataCollection,
          field: dataField,
          sort: true,
        },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      {
        name: 'yscale',
        domain: {
          data: dataCollection,
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
        title: capitalizeFirstLetter(dataField),
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
        from: { data: dataCollection },
        encode: {
          enter: {
            x: { scale: 'xscale', field: dataField },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
            tooltip: {
              signal: `{
              "${capitalizeFirstLetter(dataField)}": datum.${dataField},
              "Count": datum.count
              }`,
            },
          },
          update: {
            fill: {
              value: '#003c71',
            },
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

  const handleSelected = (name, value) => {
    setSelected(value);
  };

  const signalListeners = { select: handleSelected };

  return <Vega spec={sampleSpec} signalListeners={signalListeners} />;
}
