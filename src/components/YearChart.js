import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../reducer';
import * as actions from '../actions'
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

  componentDidMount(){

    var data = this.props.publications;

    vegaEmbed('#yearChart', spec, { "mode": "vega", "actions": false, "renderer":
    "svg", "loader": { "target": "_blank" } })
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
                  console.log(value.datum)
                  if (value && value.datum.xfield) {
                    this.props.changeYear(value.datum.xfield)
                  } else {
                    this.props.changeYear(null)
                  }
                })
              })
       } catch(error) {
         console.log("OH NO - The Schedule Viz Broke!")
         console.log(error)
       }
     })
  }

  componentDidUpdate() {
      var update = this.props.selectYear ? this.props.selectYear : null
      // this.view
      //   .signal("hoverIDs", update)
      //   .run()

    }

  render() {
   return(
     <div id="yearChart"></div>
   )
 }
}

 const mapStateToProps = state => {
   return {
     selectYear: selectors.getSelectYear(state)
   }
 }

  const mapDispatchToProps = dispatch => {
   return {
     changeYear: id => dispatch({type: 'CHANGE_SELECT_YEAR', data: id})
   }
 }


export default connect(mapStateToProps, mapDispatchToProps)(YearChart);
