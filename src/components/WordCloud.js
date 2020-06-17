import React, { Component } from "react";
import { connect } from "react-redux";
import vegaEmbed from "vega-embed";
import spec from "../vega/wordCloud";
import * as selectors from "../reducer";
import Immutable from "seamless-immutable";

export class WordCloud extends Component {
  constructor(props) {
    super(props);

    this.view = null;
    this.data = Immutable.asMutable(this.props.ngrams, { deep: true });
    console.log(Immutable.isImmutable(this.data));
  }

  embed(){
    vegaEmbed("#wordcloud", spec, {
      mode: "vega",
      actions: false,
      renderer: "svg",
    }).then((res) => {
      try {
        //look at async run and componentDidMount, etc.
        res.view.insert("table", this.data).run();
      } catch (error) {
        console.log("OH NO - The Word Cloud Viz Broke!");
        console.log(error);
      }
    }).catch(error => console.log(error))
  }

  updateView(v) {
    this.view = v;
  }

  componentDidMount() {
    this.embed()
  }

  componentDidUpdate(){
    this.data = Immutable.asMutable(this.props.ngrams, { deep: true });
    this.embed()
  }
  render() {
    return <div id="wordcloud"></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    selectWord: selectors.getSelectWord(state),
    ngrams: selectors.getNgrams(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWord: (id) => dispatch({ type: "CHANGE_SELECT_WORD", data: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordCloud);
