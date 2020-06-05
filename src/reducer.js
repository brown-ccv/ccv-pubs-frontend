import Immutable from "seamless-immutable";

export const initialState = Immutable({
  publications: [],
  ngrams: [],
  loading: true,
  selectWord: null,
  selectYear: null,
  doiInfo: {data : {}, status: "empty"},
  doi: null,
  keycloak: null,
  authenticated: false,
  doiFailure: false,
  addSuccess: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case "CHANGE_DATA":
      return state.merge({
        publications: action.data,
      });
    case "CHANGE_NGRAMS":
      return state.merge({
        ngrams: action.data,
      });
    case "CHANGE_ERROR":
      return state.merge({
        string: action.data, //no more string
      });
    case "CHANGE_LOADING":
      return state.merge({
        loading: action.data,
      });
    case "CHANGE_SELECT_WORD":
      return state.merge({
        selectWord: action.data,
      });
    case "CHANGE_SELECT_YEAR":
      return state.merge({
        selectYear: action.data,
      });
    case "CHANGE_DOI_INFO":
      console.log(action.data)
      return state.merge({
        doiInfo: action.data,
      });
    case "UPDATE_DOI_INFO":
      return state.merge({
        doiInfo: action.data,
      });
    case "UPDATE_KEYCLOAK":
      return state.merge({
        keycloak: action.data,
      });
    case "UPDATE_AUTHENTICATED":
      return state.merge({
        authenticated: action.data,
      });
    case "FETCH_DOI_FAILURE":
      return state.merge({
        doiFailure: action.data,
      });
      case "UPDATE_ADD_SUCCESS":
      return state.merge({
        addSuccess: action.data,
      });
    default:
      return state;
  }
}

export function getNgrams(state) {
  return state.ngrams;
}

export function getData(state) {
  return state.publications;
}

export function getError(state) {
  return state.string;
}

export function getLoading(state) {
  return state.loading;
}

export function getSelectWord(state) {
  return state.selectWord;
}

export function getSelectYear(state) {
  return state.selectYear;
}

export function getDoiInfo(state) {
  return state.doiInfo;
}

export function getKeycloak(state) {
  return state.keycloak;
}

export function getAunthenticated(state) {
  return state.authenticated;
}

export function getFailure(state) {
  return state.doiFailure;
}

export function getAddSuccess(state){
  return state.addSuccess;
}
