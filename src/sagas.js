import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import Client from './client';
import * as actions from './actions'
import * as _ from 'lodash';

const errorText = "Something went wrong.  Please refresh the page in a few minutes and try again.";

// -------------FETCHING SAGAS -----------------
function* fetchData(action) {

  try {
    const publications = yield call(Client.getData);
    yield put(actions.fetchData(publications));
  } catch(error) {
    yield put(actions.changeError(errorText));
  }

}

function* fetchNgrams(action) {

  try {
    const ngrams = yield call(Client.getNgrams);
    console.log(ngrams)
    yield put(actions.fetchNgrams(ngrams));
  } catch(error) {
    yield put(actions.changeError(errorText));
  }

}

function* postPub(action) {

  try {
    yield call(Client.postPub(action.newPub));
  } catch(error) {
    yield put(actions.changeError(errorText));
  }

}

function* fetchDoiInfo(action) {
  try {
    const doiInfo = yield call(Client.getDoiInfo, action.newPub);
    if(doiInfo.length > 0) {
      yield put(actions.fetchDoiInfo(doiInfo));
    } else {
      yield put(actions.setFailure(true))
    }
  } catch(error) {
    yield put(actions.changeError(errorText));
  }

}

// -------------ROOT SAGA-----------------

export default function* rootSaga() {
  yield all([
    takeEvery('FETCH_DATA', fetchData),
    takeEvery('FETCH_NGRAMS', fetchNgrams),
    
    takeEvery('POST_PUB', postPub),
    takeEvery('REQUEST_DOI_INFO', fetchDoiInfo)
  ])
}
