import Immutable from 'seamless-immutable';

const initialState = Immutable({
  publications: [],
  loading: true,
  wordCloudHover: false,
  selectYear: null
});


export default function reduce(state = initialState, action = {}) {

  switch (action.type) {
    case 'CHANGE_DATA':
    return state.merge({
      publications: action.data
    });
    case 'CHANGE_ERROR':
    return state.merge({
      string: action.data //no more string
    });
    case 'CHANGE_LOADING':
    return state.merge({
      loading: action.data
    });
    case 'CHANGE_WORD_CLOUD_HOVER':
    return state.merge({
      wordCloudHover: action.data
    });
    case 'CHANGE_SELECT_YEAR':
    return state.merge({
      selectYear: action.data
    });
    default:
      return state;
  }
}

export function getData(state) {
  return state.publications;
}

export function getError(state) {
  return state.string;
}

export function getLoading(state){
  return state.loading;
}

export function getWordCloudHover(state) {
  return state.wordCloudHover;
}

export function getSelectYear(state) {
  return state.selectYear;
}
