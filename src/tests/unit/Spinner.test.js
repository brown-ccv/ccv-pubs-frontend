import React from 'react';
import Spinner from '../../components/Spinner';
import { shallow } from 'enzyme';

describe('Spinner', () => {
  it('renders App without crashing', () => {
    shallow(<Spinner />);
  });

  it('renders with correct classes', () => {
    const wrapper = shallow(<Spinner />);
    console.log(wrapper);
    expect(
      wrapper.find('div').first().hasClass('sweet-loading row justify-content-md-center')
    ).toBe(true);
    expect(wrapper.find('div').at(1).hasClass('col-md-auto my-4')).toBe(true);
  });
});
