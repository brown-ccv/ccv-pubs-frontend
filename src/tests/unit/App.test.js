import React from 'react';
import App from '../../App';
import { shallow } from 'enzyme';

it('renders App without crashing', () => {
  shallow(<App />);
});
