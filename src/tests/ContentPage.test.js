import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ConnectedContentPage, { ContentPage } from '../components/ContentPage';

let setWord = jest.fn();
function shallowSetup(){
    const props = {
        ngrams : [{word: "cat", count: 4, freq: 33, pubs:"[117]"}]
    }
    const wrapper = shallow(<WordCloud {...props} />);
    return {
        props,
        wrapper
      };
}

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