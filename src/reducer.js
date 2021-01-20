import Immutable from "seamless-immutable";

export const initialState = Immutable({
  publications: [],
  ngrams: [],
  loading: true,
  selectWord: null,
  selectYear: null,
  error: null,
  doiInfo: { data: {}, status: "empty", abstract: "na" },
  keycloak: {
    keycloak: null,
    authenticated: null,
    iscis: null,
    profile: null,
    token: null,
  },
  doiFailure: false,
  addSuccess: false,
  pressed: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case "CHANGE_DATA":
      if (action.data.length > 0 && state.ngrams.length > 0) {
        return state.merge({
          publications: action.data,
          loading: false,
        });
      }
      return state.merge({
        publications: action.data,
      });
    case "CHANGE_NGRAMS":
      if (action.data.length > 0 && state.publications.length > 0) {
        return state.merge({
          ngrams: action.data,
          loading: false,
        });
      }
      return state.merge({
        ngrams: action.data,
      });
    case "CHANGE_ERROR":
      if (action.data) {
        return state.merge({
          error: action.data,
          loading: false,
        });
      }
      return state.merge({
        error: action.data,
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
      if (!state.error && state.pressed && action.data["status"] !== "empty") {
        return state.merge({
          doiInfo: action.data,
          loading: false,
          pressed: false,
        });
      }
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
    case "FETCH_DOI_FAILURE":
      if (!state.error) {
        return state.merge({
          doiFailure: action.data,
          pressed: false,
          loading: false,
        });
      }
      return state.merge({
        doiFailure: action.data,
      });
    case "UPDATE_ADD_SUCCESS":
      if (!state.error) {
        return state.merge({
          addSuccess: action.data,
          loading: false,
        });
      }
      return state.merge({
        addSuccess: action.data,
      });
    case "UPDATE_PRESSED":
      if (state.doiInfo["status"] === "empty" && !state.error) {
        return state.merge({
          pressed: action.data,
          loading: true,
        });
      }
      return state.merge({
        pressed: action.data,
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
  return state.error;
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

export function getDoiFailure(state) {
  return state.doiFailure;
}

export function getAddSuccess(state) {
  return state.addSuccess;
}

export function getPressed(state) {
  return state.pressed;
}
