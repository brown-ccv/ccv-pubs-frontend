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

function generateCumuSumPlot({ data = {}, xLabel = '', yLabel = '' }) {
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
        transform: [
          {
            type: 'window',
            ops: ['sum'],
            fields: ['count'],
            as: ['cumulativeSum'],
          },
        ],
      },
    ],
    signals: [
      {
        name: 'hoveredPoint',
        value: null,
        on: [
          { events: 'symbol:mouseover', update: 'datum' },
          { events: 'symbol:mouseout', update: 'null' },
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
        domain: { data: 'table', field: 'cumulativeSum' },
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
        type: 'line',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'bin', band: 0.5 },
            y: { scale: 'yscale', field: 'cumulativeSum' },
            stroke: { value: 'steelblue' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'bin', band: 0.5 },
            y: { scale: 'yscale', field: 'cumulativeSum' },
            size: { value: 60 },
            fill: { value: 'steelblue' },
          },
          update: {
            fill: { value: 'steelblue' },
            size: { value: 60 },
          },
          hover: {
            fill: { value: bar_hover_color },
            size: { value: 100 },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            x2: {
              signal:
                "hoveredPoint ? scale('xscale', hoveredPoint.bin) + (bandwidth('xscale') / 2) : 0",
            },
            y: { signal: "hoveredPoint ? scale('yscale', hoveredPoint.cumulativeSum) : 0" },
            stroke: { value: 'dimgray' },
            strokeDash: { value: [4, 4] },
            strokeWidth: { value: 1.2 },
            opacity: { signal: 'hoveredPoint ? 1 : 0' },
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

const generateBarPlotWithCumuSum = (dataJson, xLabel) => {
  // Validate input JSON structure
  if (!Array.isArray(dataJson) || dataJson.some((item) => !('label' in item && 'count' in item))) {
    throw new Error("Input must be an array of objects with 'label' and 'count' properties");
  }

  // Transform the input JSON to match Vega's expected data format
  const data = dataJson.map((item) => ({
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
        values: data,
        transform: [
          {
            type: 'window',
            ops: ['sum'],
            fields: ['count'],
            as: ['cumulativeSum'],
          },
        ],
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
      {
        name: 'hoveredPoint',
        value: null,
        on: [
          { events: 'symbol:mouseover', update: 'datum' },
          { events: 'symbol:mouseout', update: 'null' },
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
      {
        name: 'y2scale',
        type: 'linear',
        domain: { data: 'table', field: 'cumulativeSum' },
        range: 'height',
        nice: true,
      },
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale', title: xLabel },
      { orient: 'left', scale: 'yscale', title: 'Publications' },
      { orient: 'right', scale: 'y2scale', title: 'Cumulative', grid: false },
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
        type: 'line',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'bin', band: 0.5 },
            y: { scale: 'y2scale', field: 'cumulativeSum' },
            stroke: { value: 'steelblue' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'bin', band: 0.5 },
            y: { scale: 'y2scale', field: 'cumulativeSum' },
            size: { value: 50 },
            fill: { value: 'steelblue' },
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
            x: { scale: 'xscale', signal: 'tooltip.bin', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.count', offset: -2 },
            text: { signal: 'tooltip.count' },
            fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { scale: 'xscale', signal: 'tooltip.bin', band: 0.5 },
            x2: { signal: 'width' },
            y: { signal: "tooltip ? scale('y2scale', tooltip.cumulativeSum) : 0" },
            stroke: { value: 'dimgray' },
            strokeDash: { value: [4, 4] },
            strokeWidth: { value: 1.2 },
            opacity: { signal: 'tooltip && tooltip.bin ? 1 : 0' },
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
};

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

export function CountsByYearPlot({ type }) {
  let vegaSpec = {};
  const xLabel = 'Year';
  if (type === 'bar') {
    vegaSpec = generateBarPlot({
      data: inputJson,
      xLabel: xLabel,
      yLabel: 'Publications',
    });
  } else if (type === 'cumu-line') {
    vegaSpec = generateCumuSumPlot({
      data: inputJson,
      xLabel: xLabel,
      yLabel: 'Cumulative Publications',
    });
  } else if (type === 'bar-cumu-line') {
    vegaSpec = generateBarPlotWithCumuSum(inputJson, 'Year');
  }

  return <Vega spec={vegaSpec} />;
}
