import React from 'react';
import { Vega } from 'react-vega';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { selectPublications } from '../store/slice/appState';

export function YearChart() {
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
      },
      {
        name: 'publicationsByYear',
        source: 'publications',
        transform: [
          {
            type: 'filter',
            expr: 'select == null ? true : true',
          },
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
            expr: 'select !== null ? datum.year === select.year : true',
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
        value: null,
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
        domain: { data: 'publicationsByYear', field: 'year' },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      {
        name: 'yscale',
        domain: { data: 'publicationsByYear', field: 'count' },
        nice: true,
        range: 'height',
      },
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale' },
      { orient: 'left', scale: 'yscale' },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'publicationsByYear' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'year' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
          },
          update: {
            fill: { value: 'steelblue' },
          },
          hover: {
            fill: { value: 'red' },
          },
        },
      },
      // {
      //   "type": "rect",
      //   "from": {"data":"publicationsByMonth"},
      //   "encode": {
      //     "enter": {
      //       "x": {"scale": "xscale", "field": "month"},
      //       "width": {"scale": "xscale", "band": 1},
      //       "y": {"scale": "yscale", "field": "count"},
      //       "y2": {"scale": "yscale", "value": 0}
      //     },
      //     "update": {
      //       "fill": {"value": "steelblue"}
      //     },
      //     "hover": {
      //       "fill": {"value": "red"}
      //     }
      //   }
      // },
    ],
  };

  return <Vega spec={sampleSpec} />;
}
