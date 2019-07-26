import React, { Component } from 'react';
import { connect } from 'react-redux';
import vegaEmbed from 'vega-embed';
import spec from '../vega/yearChart';

export class YearChart extends Component {

  constructor(props) {
    super(props);
    this.view = null;
  }

  updateView(v) {
    this.view = v
  }
