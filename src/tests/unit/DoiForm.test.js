import React from 'react';
import { DoiForm } from '../../components/DoiForm';
import { shallow } from 'enzyme';

let setFailure = jest.fn();
let requestDoiInfo = jest.fn();
let changeLoading = jest.fn();
let changeDoiInfo = jest.fn();
let changeError = jest.fn();
let changePressed = jest.fn();
const historyMock = { push: jest.fn() };

function shallowSetup() {
  let props = {
    doiInfo: { data: {}, status: 'empty' },
    loading: false,
    requestDoiInfo: requestDoiInfo,
    changeLoading: changeLoading,
    changeDoiInfo: changeDoiInfo,
    setFailure: setFailure,
    changeError: changeError,
    changePressed: changePressed,
  };
  let wrapper = shallow(<DoiForm {...props} history={historyMock} />);
  return {
    props,
    wrapper,
  };
}

describe('DoiForm Render Tests', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    wrapper = shallowSetup()['wrapper'];
    props = shallowSetup()['props'];
    wrapper.setProps({
      keycloak: {
        keycloak: { id: 'test', logout: jest.fn() },
        authenticated: true,
        iscis: true,
        profile: 'abc123',
      },
    });
    props['keycloak'] = {
      keycloak: { id: 'test', logout: jest.fn() },
      authenticated: true,
      iscis: true,
      profile: 'abc123',
    };
    //changeDoiInfo.restore()
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders with body', () => {
    let form = wrapper.find('.doi-width');
    console.log(wrapper.props());
    console.log(form.props());
    expect(form.find('FormGroup').props().controlId).toBe('doientry');
    expect(form.find('FormLabel').text()).toBe('Please enter a DOI or DOI URL');
    expect(form.find('FormControl').props().type).toBe('doi');
    expect(form.find('Button').text()).toBe('Submit');
    expect(form.find('DoiInfo').exists()).toBe(false);
  });

  it('tests Submit Button', () => {
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    let button = wrapper.find('Button').at(0);
    button.simulate('click', event);
    expect(setFailure.mock.calls.length).toBe(1);
    expect(setFailure).toHaveBeenCalledWith(false);
    expect(changeDoiInfo).toHaveBeenCalledWith({
      data: {},
      status: 'empty',
    });
    expect(changePressed).toHaveBeenCalledWith(true);
    expect(changeLoading).toHaveBeenCalledWith(true);
    expect(changeError).toHaveBeenCalledWith(null);
  });
});
