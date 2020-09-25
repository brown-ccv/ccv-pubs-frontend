import React from "react";
//import ReactDOM from 'react-dom';
import { WordCloud } from "../../components/WordCloud";
import { shallow } from "enzyme";

let setWord = jest.fn();
function shallowSetup() {
  const props = {
    ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
  };
  const wrapper = shallow(<WordCloud {...props} />);
  return {
    props,
    wrapper,
  };
}

describe("WordCloud", () => {
  it("renders WordCloud with correct props", () => {
    const { wrapper, props } = shallowSetup();
    console.log(wrapper.props());
    expect(wrapper.props().id).toEqual("wordcloud");
  });

  it("renders with correct ngrams", () => {});
});
