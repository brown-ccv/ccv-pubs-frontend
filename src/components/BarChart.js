import React from 'react';
import { Vega } from 'react-vega';

const bar_color = '#00c398'; // ccv green
const bar_hover_color = '#ffc72c'; // ccv yellow

function generateBarPlot({ data = {}, xLabel = '', yLabel = '' }) {
  // Validate input JSON structure
  if (!Array.isArray(data) || data.some((item) => !('label' in item && 'count' in item))) {
    throw new Error("Input must be an array of objects with 'label' and 'count' properties");
  }

  // Transform the input JSON to match Vega's expected data format
  const dataMap = data.map((item) => ({
    bin: item.label, // Use 'label' for the x-axis
    count: item.count, // Use 'count' for the y-axis
  }));

  // Define the Vega specification
  const spec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 800,
    height: 400,
    padding: 5,
    data: [
      {
        name: 'table',
        values: dataMap,
      },
    ],

    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:pointerover', update: 'datum' },
          { events: 'rect:pointerout', update: '{}' },
        ],
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: 'bin' },
        range: 'width',
        padding: 0.1,
      },
      {
        name: 'yscale',
        type: 'linear',
        domain: { data: 'table', field: 'count' },
        range: 'height',
        nice: true,
      },
    ],

    axes: [
      {
        orient: 'bottom',
        scale: 'xscale',
        title: xLabel,
        labelAngle: -50,
        labelAlign: 'right',
        labelBaseline: 'top',
      },
      { orient: 'left', scale: 'yscale', title: yLabel },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'bin' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
          },
          update: {
            fill: { value: bar_color },
          },
          hover: {
            fill: { value: bar_hover_color },
          },
        },
      },
      {
        type: 'text',
        encode: {
          enter: {
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            fill: { value: '#333' },
            fontSize: { value: 15 },
          },
          update: {
            x: { scale: 'xscale', signal: `tooltip.bin`, band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.count', offset: -2 },
            text: { signal: 'tooltip.count' },
            fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
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

  return spec;
}

const inputJson = [
  { label: '2008', count: 1 },
  { label: '2009', count: 2 },
  { label: '2010', count: 6 },
  { label: '2011', count: 3 },
  { label: '2012', count: 8 },
  { label: '2013', count: 18 },
  { label: '2014', count: 35 },
  { label: '2015', count: 41 },
  { label: '2016', count: 35 },
  { label: '2017', count: 60 },
  { label: '2018', count: 70 },
  { label: '2019', count: 60 },
  { label: '2020', count: 70 },
  { label: '2021', count: 58 },
  { label: '2022', count: 62 },
  { label: '2023', count: 80 },
  { label: '2024', count: 5 },
];

export function YearBarPlot() {
  // Generate the Vega spec
  const vegaSpec = generateBarPlot({ data: inputJson, xLabel: 'Year', yLabel: 'Publications' });

  return <Vega spec={vegaSpec} />;
}
