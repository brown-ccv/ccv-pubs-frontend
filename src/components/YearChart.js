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

    vegaEmbed('#yearChart', spec, { "mode": "vega", "actions": false, "renderer": "svg", "loader": { "target": "_blank" } })
     .then((res) => {
       try {
         res.view
           .insert("source_0", this.props.publications)
            .runAsync()
            .then( (view) => {
                this.updateView(view)
                // console.log(view)
                // update the global state with the current mouseover
                view.addEventListener("click", (name, value) => {
                  if (value && value.datum.year) {
                    this.props.setCLick(value.datum.year)
                  } else {
                    this.props.setClick(null)
                  }
                })
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
