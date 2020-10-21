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

function selectListAPI(data) {
  return axios.get(`/team/${data.teamId}/joinlist`);
}

function* selectList(action) {
  try {
    const result = yield call(selectListAPI, action.data);
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

function joinManageAPI(data) {
  return axios.patch('/user/joinmanage', data);
}

function* joinManage(action) {
  try {
    const result = yield call(joinManageAPI, action.data);
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
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
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
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function changeToAPI(data) {
  return axios.patch('/user/modify', data);
}
function* changeTo(action) {
  try {
    const result = yield call(changeToAPI, action.data);
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

function setPwdAPI(data) {
  return axios.patch('/user/pwd', data);
}
function* setPwd(action) {
  try {
    yield call(setPwdAPI, action.data);
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

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
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

function joinInAPI(data) {
  return axios.patch('/user/join', data);
}

function* joinIn(action) {
  try {
    const result = yield call(joinInAPI, action.data);
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
