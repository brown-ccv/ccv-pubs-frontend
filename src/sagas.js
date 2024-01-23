/**
 * Deprecation Notice
 */

import { takeEvery, call, put, all } from 'redux-saga/effects';
import Client from './client';
import * as actions from './actions';

const errorText =
  'Could not connect to server.  Please refresh the page in a few minutes and try again.';

// -------------FETCHING SAGAS -----------------
export function* fetchData(action) {
  try {
    const publications = yield call(Client.getData);
    yield put(actions.fetchData(publications));
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

export function* fetchNgrams(action) {
  try {
    const ngrams = yield call(Client.getNgrams);
    yield put(actions.fetchNgrams(ngrams));
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

export function* postPub(action) {
  try {
    var newInfo = yield call(Client.postPub, action.newPub);
    newInfo['newdata'] = JSON.parse(newInfo['newdata']);
    newInfo['newngrams'] = JSON.parse(newInfo['newngrams']);

    yield put(actions.fetchData(newInfo['newdata']));
    yield put(actions.fetchNgrams(newInfo['newngrams']));
    yield put(actions.changeAddSuccess(true));
  } catch (error) {
    if (error.message === "Can't Add.") {
      yield put(
        actions.changeError(
          'Publication was not able to be added to database. Try to submit again.'
        )
      );
    } else if (error.message === 'Unauthorized') {
      yield put(
        actions.changeError('You are not authorized to add a publication. Trying relogging in.')
      );
    } else {
      yield put(actions.changeError(errorText));
    }
  }
}

export function* fetchDoiInfo(action) {
  try {
    const doiInfo = yield call(Client.getDoiInfo, action.newPub);
    if (doiInfo['status'] !== 'not found') {
      yield put(actions.fetchDoiInfo(doiInfo));
    } else {
      yield put(actions.changeDoiFailure(true));
    }
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

// -------------ROOT SAGA-----------------

export default function* rootSaga() {
  yield all([
    takeEvery('FETCH_DATA', fetchData),
    takeEvery('FETCH_NGRAMS', fetchNgrams),

    takeEvery('POST_PUB', postPub),
    takeEvery('REQUEST_DOI_INFO', fetchDoiInfo),
  ]);
}
