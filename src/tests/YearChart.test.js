import React from 'react';
//import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { YearChart } from '../components/YearChart';

let changeYear = jest.fn();
function shallowSetup(){
    const props = {
        publications : [{title: "test", author: "me", month: 6, year: 2020}],
        selectYear: null
    }
    const wrapper = shallow(<YearChart {...props} />);
    return {
        props,
        wrapper
      };
}

it('renders WordCloud with correct props', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().id).toEqual('yearChart');
    
  });

  it('renders WordCloud with correct props', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().id).toEqual('yearChart');
  });

