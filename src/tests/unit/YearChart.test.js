import React from "react";
//import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import { YearChart } from "../../components/YearChart";

let changeYear = jest.fn();
function shallowSetup() {
  const props = {
    publications: [{ title: "test", author: "me", month: 6, year: 2020 }],
    selectYear: null,
  };
  const wrapper = shallow(<YearChart {...props} />);
  return {
    props,
    wrapper,
  };
}

function deepSetup() {
  const props = {
    publications: [{ title: "test", author: "me", month: 6, year: 2020 }],
    selectYear: null,
  };
  const wrapper = mount(<YearChart {...props} />);
  return {
    props,
    wrapper,
  };
}

it("renders YearChart with correct props", () => {
  const { wrapper, props } = shallowSetup();
  expect(wrapper.props().id).toEqual("yearChart");
});

it("renders YearChart with correct props", () => {
  const { wrapper, props } = shallowSetup();
  expect(wrapper.props().id).toEqual("yearChart");
});

it("renders YearChart with correct props", () => {
  const { wrapper, props } = deepSetup();
  console.log(wrapper.props());
  expect(wrapper.props().publications).toStrictEqual([
    { title: "test", author: "me", month: 6, year: 2020 },
  ]);
});
