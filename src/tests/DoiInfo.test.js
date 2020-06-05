import React from 'react';
import ReactDOM from 'react-dom';
import {DoiInfo} from '../components/DoiInfo';
import { shallow } from 'enzyme';

let updateDoiInfo = jest.fn();
let postPubAction = jest.fn();
function shallowSetup(){
    const props = {
        doiInfo: {data : {}, status: "empty"}
    }
    const wrapper = shallow(<DoiInfo {...props} />);
    return {
        props,
        wrapper
      };
}

describe('DoiInfo Component Tests', () => {

    it('DoiInfo exists', () => {
        const { wrapper, props } = shallowSetup();
        console.log(wrapper.props())
        expect(wrapper.props().className).toEqual('DoiInfo');
        
      });

    it('renders with correct ngrams', () => {
        
    })
    
    });

