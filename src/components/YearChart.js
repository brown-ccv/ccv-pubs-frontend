import React, { Component } from "react";
import { connect } from "react-redux";
import * as selectors from "../reducer";
import vegaEmbed from "vega-embed";
import spec from "../vega/yearChart";
import Immutable from "seamless-immutable";

export class YearChart extends Component {
  constructor(props) {
    super(props);
    this.view = null;
    this.data = Immutable.asMutable(this.props.publications, { deep: true });
  }

  embed(){
    vegaEmbed("#yearChart", spec, {
      mode: "vega",
      actions: false,
      renderer: "svg",
      loader: { target: "_blank" },
    }).then((res) => {
      try {
        res.view
          .insert("source_0", this.data)
          .runAsync()
          .then((view) => {
            this.updateView(view);
            // update the global state with the current mouseover
            view.addEventListener("click", (name, value) => {
              console.log(value)
              if (value && value.datum.xfield && !isNaN(value.datum.xfield)) {
                this.props.changeYear(value.datum.xfield);
              } else if (value.datum.xfield && isNaN(value.datum.xfield)){
                this.props.changeYear(null);
              } 
            });
          });
      } catch (error) {
        console.log("OH NO - The YearChart Viz Broke!");
        console.log(error);
      }
    });
  }

  updateView(v) {
    this.view = v;
  }

  componentDidUpdate(){
    console.log("update")
    console.log(this.data)
    this.data = Immutable.asMutable(this.props.publications, { deep: true });
    if (!this.props.selectYear){
      this.embed();
    }
  }

  componentDidMount() {
    this.data = Immutable.asMutable(this.props.publications, { deep: true });
    console.log("here")
    this.embed();
    
  }

  render() {
    return <div id="yearChart"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectYear: selectors.getSelectYear(state),
    publications: selectors.getData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeYear: (id) => dispatch({ type: "CHANGE_SELECT_YEAR", data: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearChart);
