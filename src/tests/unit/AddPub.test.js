import React from "react";
import { AddPub } from "../../components/AddPub";
import { shallow } from "enzyme";
import { expressionFunction } from "vega";
import { MemoryRouter } from 'react-router-dom';


// const mockHistoryPush = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));
let setFailure = jest.fn()
let requestDoiInfo =jest.fn()
 let   postPubAction = jest.fn()
  let  changeLoading = jest.fn()
  let  changeKeycloak = jest.fn()
  let  changeDoiInfo = jest.fn()
  let  changeError = jest.fn()
  let  changeAddSuccess = jest.fn()
  let  changeManual = jest.fn()
   let changePressed = jest.fn()
   const historyMock = { push: jest.fn() };


function shallowSetup() {
  let props = {
    doiInfo: { data: {}, status: "empty" },
    loading: false,
    error: null,
    keycloak: {keycloak: null, authenticated: null, iscis: null, profile: null},
    doiFailure: null,
    addSuccess: false,
    manual: false,
    pressed:false,
    requestDoiInfo :requestDoiInfo,
    postPubAction : postPubAction,
    changeLoading : changeLoading,
    changeKeycloak : changeKeycloak,
    changeDoiInfo : changeDoiInfo,
    setFailure : setFailure,
    changeError :  changeError ,
    changeAddSuccess : changeAddSuccess,
    changeManual :changeManual,
    changePressed : changePressed,

  };
  let wrapper = shallow(<AddPub {...props} history={historyMock}/>);
  return {
    props,
    wrapper,
  };
}

function shallowSetupManual() {
    let props = {
      doiInfo: {
        data: {
          title: null,
          author: null,
          publisher: null,
          doi: null,
          url: null,
          abstract: null,
          volume: null,
          month: null,
          year: null,
        },
        status: "empty",
      },
      loading: false,
      error: null,
      keycloak: {keycloak: null, authenticated: null, iscis: null, profile: null},
      doiFailure: null,
      addSuccess: false,
      manual: true,
      pressed:false,
      requestDoiInfo :requestDoiInfo,
      postPubAction : postPubAction,
      changeLoading : changeLoading,
      changeKeycloak : changeKeycloak,
      changeDoiInfo : changeDoiInfo,
      setFailure : setFailure,
      changeError :  changeError ,
      changeAddSuccess : changeAddSuccess,
      changeManual :changeManual,
      changePressed : changePressed,
  
    };
    let wrapper = shallow(<AddPub {...props} history={historyMock}/>);
    return {
      props,
      wrapper,
    };
  }

  function shallowSetupNewDoi() {
    let props = {
      doiInfo: { data: {title: "test", author: "test2"}, status: "new" },
      loading: false,
      error: null,
      keycloak: {keycloak: null, authenticated: null, iscis: null, profile: null},
      doiFailure: null,
      addSuccess: false,
      manual: false,
      pressed:false,
      requestDoiInfo :requestDoiInfo,
      postPubAction : postPubAction,
      changeLoading : changeLoading,
      changeKeycloak : changeKeycloak,
      changeDoiInfo : changeDoiInfo,
      setFailure : setFailure,
      changeError :  changeError ,
      changeAddSuccess : changeAddSuccess,
      changeManual :changeManual,
      changePressed : changePressed,
  
    };
    let wrapper = shallow(<AddPub {...props} history={historyMock}/>);
    return {
      props,
      wrapper,
    };
  }

  function shallowSetupOldDoi() {
    let props = {
      doiInfo: { data: {title: "test", author: "test2"}, status: "old" },
      loading: false,
      error: null,
      keycloak: {keycloak: null, authenticated: null, iscis: null, profile: null},
      doiFailure: null,
      addSuccess: false,
      manual: false,
      pressed:false,
      requestDoiInfo :requestDoiInfo,
      postPubAction : postPubAction,
      changeLoading : changeLoading,
      changeKeycloak : changeKeycloak,
      changeDoiInfo : changeDoiInfo,
      setFailure : setFailure,
      changeError :  changeError ,
      changeAddSuccess : changeAddSuccess,
      changeManual :changeManual,
      changePressed : changePressed,
  
    };
    let wrapper = shallow(<AddPub {...props} history={historyMock}/>);
    return {
      props,
      wrapper,
    };
  }

  function shallowSetupNoDoiInfo() {
    let props = {
      doiInfo: { data: {}, status: "empty" },
      loading: false,
      error: null,
      keycloak: {keycloak: null, authenticated: null, iscis: null, profile: null},
      doiFailure: true,
      addSuccess: false,
      manual: false,
      pressed:false,
      requestDoiInfo :requestDoiInfo,
      postPubAction : postPubAction,
      changeLoading : changeLoading,
      changeKeycloak : changeKeycloak,
      changeDoiInfo : changeDoiInfo,
      setFailure : setFailure,
      changeError :  changeError ,
      changeAddSuccess : changeAddSuccess,
      changeManual :changeManual,
      changePressed : changePressed,
  
    };
    let wrapper = shallow(<AddPub {...props} history={historyMock}/>);
    return {
      props,
      wrapper,
    };
  }

describe("Keycloak Authentication tests", () => {
    it("renders with intializing", () => {
        const { wrapper, props } = shallowSetup();
        expect(wrapper.props().children).toBe('Initializing Keycloak...')
    });
    it("renders with denying authentication", () => {
        const { wrapper, props } = shallowSetup();
        wrapper.setProps({keycloak: {keycloak: "test", authenticated: null, iscis: null, profile: null}})
        expect(wrapper.props().children).toBe('Unable to authenticate!')
    });
    it("renders with denying group access", () => {
        const { wrapper, props } = shallowSetup();
        wrapper.setProps({keycloak: {keycloak: "test", authenticated: true, iscis: false, profile: null}})
        let div = wrapper.children().find('div')
        expect(div.text()).toBe('Only members of CIS can do this - open a ticket to request your publication be added')
    });
    it("renders with loading profile after passing tests", () => {
        const { wrapper, props } = shallowSetup();
        wrapper.setProps({keycloak: {keycloak: "test", authenticated: true, iscis: true, profile: null}})
        expect(wrapper.props().children).toBe('Loading Profile')
    });
    it("renders with full page after each change", () => {
        const { wrapper, props } = shallowSetup();
        wrapper.setProps({keycloak: {keycloak: "test", authenticated: true, iscis: true, profile: "abc123"}})
        expect(wrapper.find('div').at(0).props().id).toBe('AddPub')
    });
})


describe("AddPub Render Tests", () => {
    let wrapper; 
    let props;
    beforeEach(() => {
        wrapper = shallowSetup()["wrapper"]
        props = shallowSetup()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
        //changeDoiInfo.restore()
    });
    afterEach(() => {
        jest.resetAllMocks();

    });
    it("renders without crashing", ()=>{
    const { wrapper, props } = shallowSetup();
    })

    it("renders with correct setUp-NavBar", ()=>{
        let Navbar = wrapper.find('div').children().at(0)
        expect(wrapper.find('div').children().at(0).props().id).toBe("navbar-addPub")
        expect(Navbar.children().at(0).props().className).toBe('navbar-brand-custom')
        expect(Navbar.children().at(0).text()).toBe("Add a Publication")
        expect(Navbar.find('NavItem').children().at(0).text()).toBe("Logout")
        let button = Navbar.find('NavItem').children().at(0)
        
        })

    it("renders with body", ()=>{
        let form = wrapper.find('.doi-width')
        console.log(form.props())
        expect(form.find('FormGroup').props().controlId).toBe("doientry")
        expect(form.find('FormLabel').text()).toBe("Please enter a DOI or DOI URL")
        expect(form.find('FormControl').props().type).toBe("doi")
        expect(form.find('Button').text()).toBe("Submit")
        expect(form.find("DoiInfo").exists()).toBe(false)
        expect(wrapper.find('p').text()).toBe("OR")
        expect(wrapper.find('Button').at(2).text()).toBe("Enter Manually")
        expect(wrapper.find('Button').at(3).text()).toBe("Back to Home")

        })

    
})

describe("AddPub Button Functionality", () => { 
    let wrapper; 
    let props;
    beforeEach(() => {
        wrapper = shallowSetup()["wrapper"]
        props = shallowSetup()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("tests Logout Button", () => {
        let Navbar = wrapper.find('div').children().at(0)
        let button = Navbar.find('NavItem').children().at(0)
        button.simulate('click');
        expect(setFailure.mock.calls.length).toBe(1);
        expect(changeDoiInfo).toHaveBeenCalled();
        expect(changeManual.mock.calls.length).toBe(1);
        expect(changeAddSuccess.mock.calls.length).toBe(1);
        expect(historyMock.push.mock.calls.length).toBe(1);
    })
    it("tests Logout Button", () => {
        let Navbar = wrapper.find('div').children().at(0)
        let button = Navbar.find('NavItem').children().at(0)
        button.simulate('click');
        expect(setFailure.mock.calls.length).toBe(1);
        expect(changeDoiInfo).toHaveBeenCalled();
        expect(changeManual.mock.calls.length).toBe(1);
        expect(changeAddSuccess.mock.calls.length).toBe(1);
        expect(historyMock.push.mock.calls.length).toBe(1);
    })

    it("tests Submit Button", () => {
        const event = Object.assign(jest.fn(), {preventDefault: () => {}})
        let button = wrapper.find("Button").at(1)
        button.simulate('click', event);
        expect(setFailure.mock.calls.length).toBe(1)
        expect(setFailure).toHaveBeenCalledWith(false)
        expect(changeDoiInfo).toHaveBeenCalledWith({
            data: {},
            status: "empty",
          })
          expect(changePressed).toHaveBeenCalledWith(true)
          expect(changeLoading).toHaveBeenCalledWith(true)
          expect(changeManual).toHaveBeenCalledWith(false)
          expect(changeError).toHaveBeenCalledWith(null)
    })

    it("tests Enter Manual Button", () => {
        const event = Object.assign(jest.fn(), {preventDefault: () => {}})
        let button = wrapper.find("Button").at(2)
        button.simulate('click', event);
        expect(setFailure.mock.calls.length).toBe(1)
        expect(setFailure).toHaveBeenCalledWith(false)
        expect(changeDoiInfo).toHaveBeenCalledWith({
            data: {
              title: null,
              author: null,
              publisher: null,
              doi: null,
              url: null,
              abstract: null,
              volume: null,
              month: null,
              year: null,
            },
            status: "empty",
          })
        expect(changeManual.mock.calls.length).toBe(1)
        expect(changeManual).toHaveBeenCalledWith(true)
    })


    it("tests Enter Doi Button", () => {
        wrapper = shallowSetupManual()["wrapper"]
        props = shallowSetupManual()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
        const event = Object.assign(jest.fn(), {preventDefault: () => {}})
        let button = wrapper.find("Button").at(2)
        button.simulate('click', event);
        expect(setFailure.mock.calls.length).toBe(1)
        expect(setFailure).toHaveBeenCalledWith(false)
        expect(changeDoiInfo).toHaveBeenCalledWith({
            data: {},
            status: "empty",
          })
        expect(changeManual).toHaveBeenCalledWith(false)
        expect(changeAddSuccess).toHaveBeenCalledWith(false)

    })

    it("tests Back To Home Button", () => {
        wrapper = shallowSetup()["wrapper"]
        props = shallowSetup()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
        const event = Object.assign(jest.fn(), {preventDefault: () => {}})
        let button = wrapper.find("Button").at(3)
        button.simulate('click', event);
        expect(setFailure).toHaveBeenCalledWith(false)
        expect(changeDoiInfo).toHaveBeenCalledWith({
            data: {},
            status: "empty",
          })
        expect(changeManual).toHaveBeenCalledWith(false)
        expect(changeAddSuccess).toHaveBeenCalledWith(false)

    })

    it("tests Continue Button", () => {
        wrapper = shallowSetupManual()["wrapper"]
        props = shallowSetupManual()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
        const event = Object.assign(jest.fn(), {preventDefault: () => {}})
        let button = wrapper.find("Button").at(1)
        button.simulate('click', event);
        console.log(props)
        expect(wrapper.find('p').at(0).text()).toBe("Please enter at least DOI and Title")
        const data = {
            data: {
              title: "test",
              author: null,
              publisher: null,
              doi: "10.000",
              url: null,
              abstract: null,
              volume: null,
              month: null,
              year: null,
            },
            status: "empty",
          }
        wrapper.setProps({doiInfo: data}) 
          
        button.simulate('click', event);
        expect(changeLoading).toHaveBeenCalledWith(true)
        expect(postPubAction).toHaveBeenCalled()




    })
    
})

describe("ManualAdd Render Test", () => { 
    let wrapper; 
    let props;
    beforeEach(() => {
        wrapper = shallowSetupManual()["wrapper"]
        props = shallowSetupManual()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})     
        props["keycloak"] = {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}
        props["doiInfo"] = {
            data: {
              title: null,
              author: null,
              publisher: null,
              doi: null,
              url: null,
              abstract: null,
              volume: null,
              month: null,
              year: null,
            },
            status: "empty",
          }
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('renders blank DoiInfo', () => {
        expect(wrapper.find("Connect(DoiInfo)").exists()).toBe(true)
        expect(wrapper.find("Button").at(2).text()).toBe("Enter DOI")
    })
})

describe("Old Doi Render Test", () => { 
    let wrapper; 
    let props;
    beforeEach(() => {
        wrapper = shallowSetupOldDoi()["wrapper"]
        props = shallowSetupOldDoi()["props"]
        wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})  
    })
        afterEach(() => {
            jest.resetAllMocks();
        })

        it('renders blank DoiInfo', () => {
            expect(wrapper.find("Connect(DoiInfo)").exists()).toBe(true)
            expect(wrapper.find('Button').at(2).text()).toBe('Insert Edited Publication Information')
        })

    })

    describe("New Doi Render Test", () => { 
        let wrapper; 
        let props;
        beforeEach(() => {
            wrapper = shallowSetupNewDoi()["wrapper"]
            props = shallowSetupNewDoi()["props"]
            wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})  
        })
            afterEach(() => {
                jest.resetAllMocks();
            })
    
            it('renders DoiInfo', () => {
                expect(wrapper.find("Connect(DoiInfo)").exists()).toBe(true)
                expect(wrapper.find('Button').at(2).text()).toBe('Continue with Submission')
            })
    
        })

        describe("No Doi Info Render Test", () => { 
            let wrapper; 
            let props;
            beforeEach(() => {
                wrapper = shallowSetupNoDoiInfo()["wrapper"]
                props = shallowSetupNoDoiInfo()["props"]
                wrapper.setProps({keycloak: {keycloak: {id: "test", logout: jest.fn()}, authenticated: true, iscis: true, profile: "abc123"}})  
            })
                afterEach(() => {
                    jest.resetAllMocks();
                })
        
                it('renders no DoiInfo', () => {
                    expect(wrapper.find("Connect(DoiInfo)").exists()).toBe(false)
                    expect(wrapper.find('p').at(0).text()).toBe('No Information Found')
                })
        
            })
