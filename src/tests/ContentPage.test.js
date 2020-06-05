import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ConnectedContentPage, { ContentPage } from '../components/ContentPage';


it('renders ComponentPage without crashing', () => {
    shallow(<ContentPage/>)
});

// describe('Content Page', () => {
//     let wrapper;
//     // our mock login function to replace the one provided by mapDispatchToProps
//     const mockLoginfn = jest.fn();
   
//      beforeEach(() => {
//        // pass the mock function as the login prop 
//        wrapper = shallow(<Login login={mockLoginfn}/>)
//      })
//   // ...tests here...
//   }