import React from 'react';
import { PubsTable } from '../../components/PubsTable';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

let changeSelectWord = jest.fn();
let changeSelectYear = jest.fn();

function shallowSetupEmpty() {
  const props = {
    publications: [],
    selectYear: null,
    selectWord: null,
    changeSelectWord: changeSelectWord,
    changeSelectYear: changeSelectYear,
  };
  const wrapper = shallow(<PubsTable {...props} />);
  return {
    props,
    wrapper,
  };
}

function shallowSetup() {
  const props = {
    publications: Immutable([{ title: 'test', author: 'me' }]),
    selectYear: null,
    selectWord: null,
    changeSelectWord: changeSelectWord,
    changeSelectYear: changeSelectYear,
  };
  const wrapper = shallow(<PubsTable {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('PubsTable Component Tests', () => {
  it('renders empty without crashing', () => {
    const { wrapper, props } = shallowSetupEmpty();
  });
  it('PubsTable renders with correct columns', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().columns[0]['Header']).toEqual('Title');
    expect(wrapper.props().columns[1]['Header']).toEqual('Authors');
    expect(wrapper.props().columns[2]['Header']).toEqual('Year');
    expect(wrapper.props().columns[3]['Header']).toEqual('URL');
  });
  it('PubsTable renders with correct data', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().data[0]['title']).toEqual('test');
    expect(wrapper.props().data[0]['author']).toEqual('me');
  });
});

function shallowSetupwYear() {
  const props = {
    publications: Immutable([
      { title: 'test', author: 'me', year: 2015 },
      { title: 'show', year: 2014 },
      { title: 'no show', author: 'none', year: 2000 },
    ]),
    selectYear: 2014,
    selectWord: null,
    changeSelectWord: changeSelectWord,
    changeSelectYear: changeSelectYear,
  };
  const wrapper = shallow(<PubsTable {...props} />);
  return {
    props,
    wrapper,
  };
}

function shallowSetupFilter() {
  const props = {
    publications: Immutable([
      { title: 'test', author: 'me', year: 2015 },
      { title: 'show', year: 2014 },
      { title: 'no show', author: 'none', year: 2000 },
    ]),
    selectYear: null,
    selectWord: null,
    changeSelectWord: changeSelectWord,
    changeSelectYear: changeSelectYear,
  };
  const wrapper = shallow(<PubsTable {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('PubsTable Filter Tests', () => {
  const { wrapper, props } = shallowSetupwYear();
  it('filters table if year is selected', () => {
    expect(wrapper.props().data.length).toBe(1);
    expect(wrapper.props().data[0]['year']).toBe(2014);
    expect(wrapper.props().data[0]['title']).toBe('show');
  });
});

describe('PubsTable internal functions test', () => {
  const { wrapper, props } = shallowSetupFilter();
  it('change to html', () => {
    let url = { value: 'www.fake.com' };
    let result = wrapper.instance().changetoHTML(url);
    expect(shallow(result).html()).toBe('<a href="www.fake.com">www.fake.com</a>');
  });

  it('filter case insensitive', () => {
    let filter = { id: 'title', value: 'show' };
    let pubs = wrapper.props().data;
    let func = wrapper.instance().filterCaseInsensitive;
    let result = _.filter(pubs, (row) => func(filter, row));
    expect(result).toStrictEqual([
      { title: 'show', year: 2014 },
      { title: 'no show', author: 'none', year: 2000 },
    ]);
  });
});
