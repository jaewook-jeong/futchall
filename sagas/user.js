import { all, fork, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_TO_REQUEST,
  CHANGE_TO_SUCCESS,
  CHANGE_TO_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  JOIN_IN_FAILURE,
  JOIN_IN_REQUEST,
  JOIN_IN_SUCCESS,
  SET_PWD_REQUEST,
  SET_PWD_SUCCESS,
  SET_PWD_FAILURE,
  SELECT_LIST_REQUEST,
  SELECT_LIST_SUCCESS,
  SELECT_LIST_FAILURE,
  JOIN_MANAGE_REQUEST,
  JOIN_MANAGE_SUCCESS,
  JOIN_MANAGE_FAILURE,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get('/auth/myinfo');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function loginAPI(data) {
  return axios.post('/auth/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function selectListAPI(action) {
  return axios.get(`/team/${action.data.teamId}/joinlist`, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* selectList(action) {
  try {
    const result = yield call(selectListAPI, action);
    yield put({
      type: SELECT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELECT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSelectList() {
  yield takeLatest(SELECT_LIST_REQUEST, selectList);
}

function joinManageAPI(action) {
  return axios.patch('/user/joinmanage', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* joinManage(action) {
  try {
    const result = yield call(joinManageAPI, action);
    yield put({
      type: JOIN_MANAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: JOIN_MANAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchJoinManage() {
  yield takeLatest(JOIN_MANAGE_REQUEST, joinManage);
}

function signUpAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function changeToAPI(action) {
  return axios.patch('/user/modify', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}
function* changeTo(action) {
  try {
    const result = yield call(changeToAPI, action);
    yield put({
      type: CHANGE_TO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_TO_FAILURE,
      error: e.response.data,
    });
  }
}
function* watchChangeTo() {
  yield takeLatest(CHANGE_TO_REQUEST, changeTo);
}

function setPwdAPI(action) {
  return axios.patch('/user/pwd', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}
function* setPwd(action) {
  try {
    yield call(setPwdAPI, action);
    yield put({
      type: SET_PWD_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: SET_PWD_FAILURE,
      error: e.response.data,
    });
  }
}
function* watchSetPwd() {
  yield takeLatest(SET_PWD_REQUEST, setPwd);
}

function logOutAPI(token) {
  return axios.post('/user/logout', null, { headers: { Authorization: `Bearer ${token}` } });
}

function* logOut(action) {
  try {
    yield call(logOutAPI, action.token);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function joinInAPI(action) {
  return axios.patch('/user/join', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* joinIn(action) {
  try {
    const result = yield call(joinInAPI, action);
    yield put({
      type: JOIN_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: JOIN_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchJoinIN() {
  yield takeLatest(JOIN_IN_REQUEST, joinIn);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchChangeTo),
    fork(watchLogOut),
    fork(watchJoinIN),
    fork(watchSetPwd),
    fork(watchSelectList),
    fork(watchJoinManage),
  ]);
}
