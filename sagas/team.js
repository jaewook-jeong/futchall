import { all, delay, fork, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  SELECT_TEAM_FAILURE,
  SELECT_TEAM_REQUEST,
  SELECT_TEAM_SUCCESS,
  ENROLL_TEAM_FAILURE,
  ENROLL_TEAM_REQUEST,
  ENROLL_TEAM_SUCCESS,
  LOAD_LIST_REQUEST,
  LOAD_LIST_SUCCESS,
  LOAD_LIST_FAILURE,
  SEARCH_TEAMS_REQUEST,
  SEARCH_TEAMS_SUCCESS,
  SEARCH_TEAMS_FAILURE,
  EDIT_TEAM_REQUEST,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAILURE,
} from '../reducers/team';
import { ENROLL_TEAM_INFO } from '../reducers/user';

function selectAPI(data) {
  return axios.get(`/team/${data.id}`);
}

function* select(action) {
  try {
    const team = yield call(selectAPI, action.data);
    yield put({
      type: SELECT_TEAM_SUCCESS,
      data: team.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SELECT_TEAM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchSelect() {
  yield takeEvery(SELECT_TEAM_REQUEST, select);
}

function editAPI(data) {
  return axios.patch(`/team/${data.id}`, data);
}

function* edit(action) {
  try {
    const team = yield call(editAPI, action.data);
    yield put({
      type: EDIT_TEAM_SUCCESS,
      data: team.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_TEAM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEdit() {
  yield takeLatest(EDIT_TEAM_REQUEST, edit);
}

function enrollAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.post('/team/register', data);
}

function* enroll(action) {
  try {
    const teamInfo = yield call(enrollAPI, action.data);
    yield put({
      type: ENROLL_TEAM_SUCCESS,
    });
    yield put({
      type: ENROLL_TEAM_INFO,
      data: teamInfo,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ENROLL_TEAM_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEnroll() {
  yield takeEvery(ENROLL_TEAM_REQUEST, enroll);
}

function loadAPI() {
  return axios.get('/team/rank');
}
function* load() {
  try {
    // yield call(loadAPI);
    yield delay(1000);
    yield put({
      type: LOAD_LIST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOAD_LIST_FAILURE,
      error: e,
    });
  }
}
function* watchLoad() {
  yield takeEvery(LOAD_LIST_REQUEST, load);
}

function searchAPI(query) {
  if (query.indexOf('지역검색 :') === 0) {
    return axios.get(`team/search?loc=${query}`);
  }
  return axios.get(`team/search?q=${query}`);
}
function* search(action) {
  try {
    // yield call(searchAPI(action.data..query));
    yield delay(1000);
    yield put({
      type: SEARCH_TEAMS_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: SEARCH_TEAMS_FAILURE,
      error: e,
    });
  }
}
function* watchSearch() {
  yield takeLatest(SEARCH_TEAMS_REQUEST, search);
}
export default function* teamSaga() {
  yield all([
    fork(watchSelect),
    fork(watchEnroll),
    fork(watchLoad),
    fork(watchSearch),
    fork(watchEdit),
  ]);
}
