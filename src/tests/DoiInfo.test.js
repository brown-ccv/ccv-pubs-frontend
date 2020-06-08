import React from 'react';
import ReactDOM from 'react-dom';
import {DoiInfo} from '../components/DoiInfo';
import { shallow } from 'enzyme';
import { FormGroup } from '@material-ui/core';

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

    it('renders with correct empty Form', () => {
        const { wrapper, props } = shallowSetup();
        console.log(wrapper.find('FormLabel').first().text())
        expect(wrapper.find('Form').hasClass('DoiForm')).toBe(true)
        expect(wrapper.find('FormGroup').length).toBe(9);
        expect(wrapper.find('FormLabel').first().text()).toBe("Title")
        expect(wrapper.find('FormControl').first().placeholder).toBe("Enter Title")
    })
    
    });

