import { takeLatest, takeEvery, call, put, all } from "redux-saga/effects";
import Client from "./client";
import * as actions from "./actions";
import * as _ from "lodash";

const errorText =
  "Something went wrong.  Please refresh the page in a few minutes and try again.";

// -------------FETCHING SAGAS -----------------
function* fetchData(action) {
  try {
    const publications = yield call(Client.getData);
    yield put(actions.fetchData(publications));
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

function* fetchNgrams(action) {
  try {
    const ngrams = yield call(Client.getNgrams);
    console.log(ngrams);
    yield put(actions.fetchNgrams(ngrams));
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

function* postPub(action) {
  try {
    var newInfo = yield call(Client.postPub,action.newPub);
    console.log(newInfo)
    newInfo["newdata"] = JSON.parse(newInfo["newdata"])
    newInfo["newngrams"] = JSON.parse(newInfo["newngrams"])

    console.log(newInfo["newdata"])
    console.log(newInfo["newngrams"])

    yield put(actions.fetchData(newInfo["newdata"]))
    yield put(actions.fetchNgrams(newInfo["newngrams"]))
    yield put(actions.changeAddSuccess(true))
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

function* fetchDoiInfo(action) {
  try {
    const doiInfo = yield call(Client.getDoiInfo, action.newPub);
    console.log(doiInfo)
    console.log(doiInfo["status"])
    if (doiInfo["status"] !== "not found") {
      yield put(actions.fetchDoiInfo(doiInfo));
    } else {
      yield put(actions.setFailure(true));
    }
  } catch (error) {
    yield put(actions.changeError(errorText));
  }
}

// -------------ROOT SAGA-----------------

export default function* rootSaga() {
  yield all([
    takeEvery("FETCH_DATA", fetchData),
    takeEvery("FETCH_NGRAMS", fetchNgrams),

    takeEvery("POST_PUB", postPub),
    takeEvery("REQUEST_DOI_INFO", fetchDoiInfo),
  ]);
}
