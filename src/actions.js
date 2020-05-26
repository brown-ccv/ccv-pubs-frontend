
export function fetchData(data) {
  return({ type: 'CHANGE_DATA', data})
}

export function fetchNgrams(data) {
  console.log(data)
  return({ type: 'CHANGE_NGRAMS', data})
}

export function changeError(data) {
  return({ type: 'CHANGE_ERROR', data})
}

export function changeLoading(data){
  return({ type: 'CHANGE_LOADING', data})
}

export function changeYear(data){
  return ({type: 'CHANGE_SELECT_YEAR', data})
}

export function changeSelectWord(data){
  return ({type: 'CHANGE_SELECT_WORD', data})
}

export function postPubAction(newPub){
  console.log(newPub)
  return ({type: 'POST_PUB', newPub})
}

export function requestDoiInfo(newPub){
  return ({type: 'REQUEST_DOI_INFO', newPub})
}

export function fetchDoiInfo(data){
  console.log(data)
  return ({type: 'CHANGE_DOI_INFO', data})
}

export function changeDoiInfo(data){
  return({ type: 'UPDATE_DOI_INFO', data})
}

export function changeKeycloak(data){
  console.log(data)
  return({ type: 'UPDATE_KEYCLOAK', data}) 
}

export function changeAuthenticated(data){
  return({ type: 'UPDATE_AUTHENTICATED', data}) 
}

export function setFailure(data){
  return ({type: 'FETCH_DOI_FAILURE', data})
}
