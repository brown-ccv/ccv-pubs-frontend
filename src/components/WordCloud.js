import React, { Component } from 'react';
import { connect } from 'react-redux';
import vegaEmbed from 'vega-embed';
import spec from '../vega/wordCloud';

export default class WordCloud extends Component {

  constructor(props) {
    super(props);

    this.view = null;
  }

  updateView(v) {
    this.view = v
  }

  componentDidMount() {
    vegaEmbed('#wordcloud', spec, { "mode": "vega", "actions": false, "renderer": "svg"})
    .then( (res)  => {
      try {
        res.view
        .runAsync()
        .then( (view) => {
          // console.log(view)
          this.updateView(view)
          // update the global state with the current mouseover
          view.addEventListener("mouseover", (name, value) => {
            if (value && value.datum.pubs) {
              this.props.setHover(value.datum.pubs)
            } else {
              this.props.setHover(null)
            }
          })
        })
      } catch(error) {
        console.log("OH NO - The Word Cloud Viz Broke!")
        console.log(error)
      }
    })
  }
  render() {
    return(
      <div id="wordcloud"></div>
    )
  }
}
