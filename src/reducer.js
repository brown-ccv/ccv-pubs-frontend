import Immutable from 'seamless-immutable';

const initialState = Immutable({
  publications: [],
  ngrams: [],
  loading: true,
  selectWord: null,
  selectYear: null
});


export default function reduce(state = initialState, action = {}) {

  switch (action.type) {
    case 'CHANGE_DATA':
    return state.merge({
      publications: action.data
    });
    case 'CHANGE_NGRAMS':
      console.log(action.data)
    return state.merge({
      ngrams: action.data
    });
    case 'CHANGE_ERROR':
    return state.merge({
      string: action.data //no more string
    });
    case 'CHANGE_LOADING':
    return state.merge({
      loading: action.data
    });
    case 'CHANGE_SELECT_WORD':
    return state.merge({
      selectWord: action.data
    });
    case 'CHANGE_SELECT_YEAR':
    return state.merge({
      selectYear: action.data
    });
    default:
      return state;
  }
}

export function getNgrams(state){
  return state.ngrams;
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

export function getSelectWord(state) {
  return state.selectWord;
}

export function getSelectYear(state) {
  return state.selectYear;
}
