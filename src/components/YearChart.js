import React, { Component } from 'react';
import { connect } from 'react-redux';
import vegaEmbed from 'vega-embed';
import spec from '../vega/yearChart';

export default class YearChart extends Component {

  constructor(props) {
    super(props);
    this.view = null;
  }

  updateView(v) {
    this.view = v
  }

  componentDidMount(){

    var data = this.props.publications;

    vegaEmbed('#schedule', spec, { "mode": "vega", "actions": false, "renderer": "svg", "loader": { "target": "_blank" } })
     .then((res) => {
       try {
         res.view
           .runAsync()
             .then( (view) => {
               this.updateView(view)
               // console.log(view)
               // update the global state with the current mouseover
             })
       } catch(error) {
         console.log("OH NO - The Schedule Viz Broke!")
         console.log(error)
       }
     })
  }
  render() {
   return(
     <div id="yearChart"></div>
   )
 }
}
