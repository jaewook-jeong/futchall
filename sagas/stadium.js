import { all, delay, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  SELECT_STADIUM_FAILURE,
  SELECT_STADIUM_REQUEST,
  SELECT_STADIUM_SUCCESS,
  ENROLL_STADIUM_FAILURE,
  ENROLL_STADIUM_REQUEST,
  ENROLL_STADIUM_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  TAKE_STADIUM_REQUEST,
  TAKE_STADIUM_SUCCESS,
  TAKE_STADIUM_FAILURE,
} from '../reducers/stadium';
import { EXPIRE_VALID_STADIUM } from '../reducers/location';

function selectAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/stadium/${data}`);
}

function* select(action) {
  try {
    const stadium = yield call(selectAPI, action.data);
    if (stadium.data.expired) {
      yield put({
        type: EXPIRE_VALID_STADIUM,
        data: stadium.data.data,
      });
    }
    yield put({
      type: SELECT_STADIUM_SUCCESS,
      data: stadium.data.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SELECT_STADIUM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchSelect() {
  yield takeEvery(SELECT_STADIUM_REQUEST, select);
}

function enrollAPI(action) {
  return axios.post('/stadium/register', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* enroll(action) {
  try {
    yield call(enrollAPI, action);
    yield put({
      type: ENROLL_STADIUM_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ENROLL_STADIUM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEnroll() {
  yield takeEvery(ENROLL_STADIUM_REQUEST, enroll);
}

function takeAPI(action) {
  return axios.post(`/stadium/${action.data.id}/take`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* take(action) {
  try {
    const result = yield call(takeAPI, action);
    yield put({
      type: TAKE_STADIUM_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TAKE_STADIUM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchTake() {
  yield takeLatest(TAKE_STADIUM_REQUEST, take);
}

/// ////////////////////////////////////////////////////
function addCommentAPI(data) {
  return axios.post('/stadium/', data);
}

function* add(action) {
  try {
    // yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: [action.data, ...dummyComment],
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, add);
}
export default function* stadiumSaga() {
  yield all([
    fork(watchSelect),
    fork(watchEnroll),
    fork(watchAddComment),
    fork(watchTake),
  ]);
}
