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

// -------------ROOT SAGA-----------------

export default function* rootSaga() {
  yield all([
    takeEvery('FETCH_DATA', fetchData)
  ])
}
