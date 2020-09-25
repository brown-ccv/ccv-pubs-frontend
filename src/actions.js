export function fetchData(data) {
  return { type: "CHANGE_DATA", data };
}

export function fetchNgrams(data) {
  return { type: "CHANGE_NGRAMS", data };
}

export function changeError(data) {
  return { type: "CHANGE_ERROR", data };
}

export function changeLoading(data) {
  return { type: "CHANGE_LOADING", data };
}

export function changeYear(data) {
  return { type: "CHANGE_SELECT_YEAR", data };
}

export function changeSelectWord(data) {
  return { type: "CHANGE_SELECT_WORD", data };
}

export function postPubAction(newPub) {
  return { type: "POST_PUB", newPub };
}

export function requestDoiInfo(newPub) {
  return { type: "REQUEST_DOI_INFO", newPub };
}

export function fetchDoiInfo(data) {
  return { type: "CHANGE_DOI_INFO", data };
}

export function changeDoiInfo(data) {
  return { type: "UPDATE_DOI_INFO", data };
}

export function changeKeycloak(data) {
  return { type: "UPDATE_KEYCLOAK", data };
}

export function changeDoiFailure(data) {
  return { type: "FETCH_DOI_FAILURE", data };
}

export function changeAddSuccess(data) {
  return { type: "UPDATE_ADD_SUCCESS", data };
}

export function changePressed(data) {
  return { type: "UPDATE_PRESSED", data };
}

export function changeAuthenticated(data) {
  return { type: "CHANGE_AUTHENTICATED", data };
}
