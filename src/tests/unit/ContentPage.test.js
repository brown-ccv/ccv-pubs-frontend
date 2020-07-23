import React from "react";
import { shallow } from "enzyme";
import { ContentPage } from "../../components/ContentPage";

let changeError = jest.fn();
let changeLoading = jest.fn();
let fetchNgrams = jest.fn();
let fetchData = jest.fn();

//set up wrapper with empty props
function shallowSetup() {
  const props = {
    changeError: changeError,
    changeLoading: changeLoading,
    fetchNgrams: fetchNgrams,
    fetchData: fetchData,
    publications: [],
    error: null,
    loading: true,
    ngrams: [],
  };
  const wrapper = shallow(<ContentPage {...props} />);
  return {
    props,
    wrapper,
  };
}

//set up wrapper with full props
function shallowSetupFull() {
  const props = {
    changeError: changeError,
    changeLoading: changeLoading,
    fetchNgrams: fetchNgrams,
    fetchData: fetchData,
    publications: [
      { title: "test", author: "me", year: 2020, url: "www.test.com" },
    ],
    error: null,
    loading: false,
    ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
  };
  const wrapper = shallow(<ContentPage {...props} />);
  return {
    props,
    wrapper,
  };
}

//set up wrapper when an error occurs
function shallowSetupError() {
  const props = {
    changeError: changeError,
    changeLoading: changeLoading,
    fetchNgrams: fetchNgrams,
    fetchData: fetchData,
    publications: [],
    error: "something went wrong",
    loading: true,
    ngrams: [],
  };
  const wrapper = shallow(<ContentPage {...props} />);
  return {
    props,
    wrapper,
  };
}

describe("Rendering Component Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders ComponentPage without crashing", () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().className).toEqual("ContentPage");
  });

  it("renders ComponentPage with correct display when loading w no data", () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.find("Button").text()).toBe("Add a Publication");
    expect(wrapper.find("Spinner").props().loading).toBe(true);
    expect(wrapper.find("h1").first().text()).toBe("Publications");
    expect(wrapper.find("FontAwesomeIcon").exists()).toBe(true);

    expect(wrapper.find("h3").exists()).toBe(false);
    expect(wrapper.find("div.PubsTable-CP").exists()).toBe(false);
    expect(wrapper.find("div.viz").children().length).toBe(0);

    expect(fetchData.mock.calls.length).toBe(1);
    expect(fetchNgrams.mock.calls.length).toBe(1);
    expect(changeLoading.mock.calls.length).toBe(0);
  });

  it("renders ComponentPage with correct display when loaded", () => {
    const { wrapper, props } = shallowSetupFull();
    expect(wrapper.find("Button").text()).toBe("Add a Publication");
    expect(wrapper.find("Spinner").props().loading).toBe(false);

    const Table = wrapper.find("div.PubsTable-CP").children().at(0);
    expect(Table.props().publications).toEqual([
      { title: "test", author: "me", year: 2020, url: "www.test.com" },
    ]);

    expect(wrapper.find("h1").first().text()).toBe("Publications");
    expect(wrapper.find("FontAwesomeIcon").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe(
      " What are these publications all about? "
    );
    expect(wrapper.find("div.PubsTable-CP").exists()).toBe(true);
    expect(wrapper.find("div.viz").children().length).toBe(2);

    const WordCloud = wrapper.find("div.viz").children().at(0);
    const YearChart = wrapper.find("div.viz").children().at(1);

    expect(WordCloud.name()).toBe("Connect(WordCloud)");
    expect(YearChart.name()).toBe("Connect(YearChart)");

    expect(fetchData.mock.calls.length).toBe(0);
    expect(fetchNgrams.mock.calls.length).toBe(0);
    expect(changeLoading.mock.calls.length).toBe(0);
  });

  it("renders with errortext when an error occurs", () => {
    const { wrapper, props } = shallowSetupError();
    expect(wrapper.find("div.error-text").children().props().children).toEqual(
      "something went wrong"
    );
    expect(wrapper.find("h1").first().text()).toBe("Publications");
    expect(wrapper.find("FontAwesomeIcon").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(false);
    expect(wrapper.find("div.PubsTable-CP").exists()).toBe(false);
    expect(wrapper.find("div.viz").children().length).toBe(0);

    expect(fetchData.mock.calls.length).toBe(1);
    expect(fetchNgrams.mock.calls.length).toBe(1);
    expect(changeLoading.mock.calls.length).toBe(0);
  });
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
