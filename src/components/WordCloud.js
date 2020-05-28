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
    this.data = Immutable.asMutable(this.props.ngrams);
    console.log(Immutable.isImmutable(this.data));
  }

  updateView(v) {
    this.view = v;
  }

  componentDidMount() {
    var data = Immutable.asMutable(this.props.ngrams, { deep: true });
    console.log(this.data);

    vegaEmbed("#wordcloud", spec, {
      mode: "vega",
      actions: false,
      renderer: "svg",
    }).then((res) => {
      try {
        res.view.insert("table", data).run();
        // .then( (view) => {
        //   // console.log(view)
        //   this.updateView(view)
        //   // update the global state with the current mouseover
        //   view.addEventListener("click", (name, value) => {
        //     if (value && value.datum.pubs) {
        //       console.log(name)
        //       console.log(value)
        //       this.props.setWord(value.datum.pubs)
        //       console.log(this.props.selectWord)
        //     } else {
        //       this.props.setWord(null)
        //     }
        //   })
        // })
      } catch (error) {
        console.log("OH NO - The Word Cloud Viz Broke!");
        console.log(error);
      }
    });
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
