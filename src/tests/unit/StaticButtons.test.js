import React from "react";
import StaticButtons from "../../components/StaticButtons";
import { shallow } from "enzyme";

let onDOI = jest.fn();
let onCancel = jest.fn();
let onManual = jest.fn();
let setFailure = jest.fn();

function shallowSetup() {
  let props = {
    manual: false,
    onDOI: onDOI,
    onCancel: onCancel,
    onManual: onManual,
    setFailure: setFailure,
  };
  let wrapper = shallow(<StaticButtons {...props} />);
  return {
    props,
    wrapper,
  };
}

function shallowSetupManual() {
  let props = {
    manual: true,
    onDOI: onDOI,
    onCancel: onCancel,
    onManual: onManual,
    setFailure: setFailure,
  };
  let wrapper = shallow(<StaticButtons {...props} />);
  return {
    props,
    wrapper,
  };
}

describe("StaticButtons Functionality", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    wrapper = shallowSetup()["wrapper"];
    props = shallowSetup()["props"];
    wrapper.setProps({
      keycloak: {
        keycloak: { id: "test", logout: jest.fn() },
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
    });
    props["keycloak"] = {
      keycloak: { id: "test", logout: jest.fn() },
      authenticated: true,
      iscis: true,
      profile: "abc123",
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("tests Enter Manual Button", () => {
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    let button = wrapper.find("Button").at(0);
    button.simulate("click", event);
    expect(onManual).toHaveBeenCalled();
    expect(onManual.mock.calls.length).toBe(1);
  });
  it("tests Enter Doi Button", () => {
    wrapper = shallowSetupManual()["wrapper"];
    props = shallowSetupManual()["props"];
    wrapper.setProps({
      keycloak: {
        keycloak: { id: "test", logout: jest.fn() },
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
    });
    props["keycloak"] = {
      keycloak: { id: "test", logout: jest.fn() },
      authenticated: true,
      iscis: true,
      profile: "abc123",
    };
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    let button = wrapper.find("Button").at(0);
    button.simulate("click", event);
    expect(onDOI).toHaveBeenCalled();
    expect(onDOI.mock.calls.length).toBe(1);
  });
  it("tests Back To Home Button", () => {
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    let button = wrapper.find("Button").at(1);
    button.simulate("click", event);
    expect(onCancel).toHaveBeenCalled();
    expect(onCancel.mock.calls.length).toBe(1);
  });
});
