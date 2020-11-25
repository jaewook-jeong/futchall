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
  GET_CALENDAR_REQUEST,
  GET_CALENDAR_SUCCESS,
  GET_CALENDAR_FAILURE,
  SET_CALENDAR_REQUEST,
  SET_CALENDAR_SUCCESS,
  SET_CALENDAR_FAILURE
} from '../reducers/team';

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

function getCalendarAPI(action) {
  return axios.post(`/team/${action.data.teamId}/calendar`, action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* getCalendar(action) {
  try {
    const calendar = yield call(getCalendarAPI, action);
    yield put({
      type: GET_CALENDAR_SUCCESS,
      data: calendar.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_CALENDAR_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchGetCalendar() {
  yield takeLatest(GET_CALENDAR_REQUEST, getCalendar);
}

function setCalendarAPI(action) {
  return axios.post('/team/calendar', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* setCalendar(action) {
  try {
    const calendar = yield call(setCalendarAPI, action);
    yield put({
      type: SET_CALENDAR_SUCCESS,
      data: calendar.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SET_CALENDAR_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchSetCalendar() {
  yield takeLatest(SET_CALENDAR_REQUEST, setCalendar);
}

function editAPI(action) {
  return axios.patch(`/team/${action.data.id}`, action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* edit(action) {
  try {
    const team = yield call(editAPI, action);
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

function enrollAPI(action) {
  // 서버에 요청을 보내는 부분
  return axios.post('/team/register', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* enroll(action) {
  try {
    yield call(enrollAPI, action);
    yield put({
      type: ENROLL_TEAM_SUCCESS,
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
    const result = call(loadAPI);
    yield put({
      type: LOAD_LIST_SUCCESS,
      data: result.data,
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

function searchAPI(action) {
  return axios.post('/team/search', action.data);
}
function* search(action) {
  try {
    const result = yield call(searchAPI, action);
    yield put({
      type: SEARCH_TEAMS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_TEAMS_FAILURE,
      error: e.response.data,
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
    fork(watchGetCalendar),
    fork(watchSetCalendar),
  ]);
}
