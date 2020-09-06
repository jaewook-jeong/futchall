import { all, delay, fork, put, takeEvery, call } from 'redux-saga/effects';
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
} from '../reducers/stadium';

function selectAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/stadium/${data}`);
}

function* select(action) {
  try {
    const result = yield call(selectAPI, action.data);
    yield put({
      type: SELECT_STADIUM_SUCCESS,
      data: result.data,
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

function enrollAPI(data) {
  return axios.post('/stadium/register', data);
}

function* enroll(action) {
  try {
    yield call(enrollAPI, action.data);
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
  ]);
}
