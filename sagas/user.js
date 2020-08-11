import { all, delay, fork, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
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
  PREEMPT_REQUEST,
  PREEMPT_SUCCESS,
  PREEMPT_FAILURE,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI);
    yield delay(2000);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error:e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.post('http://localhost:3065/user/signup', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({ // put은 dispatch 동일
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
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function changeToAPI(data) {
  return axios.post('/user/modify');
}
function* changeTo(action) {
  try{
    // yield call(changeToAPI(action));
    console.log("여기는 사가",action.data)
    yield delay(1000);
    yield put({
      type:CHANGE_TO_SUCCESS,
    })
  }catch (e) {
    yield put({
      type:CHANGE_TO_FAILURE,
      error:e,
    })
  }
}
function* watchChangeTo(){
  yield takeLatest(CHANGE_TO_REQUEST, changeTo);
}

function preemptAPI(data){
  return axios.post(`/user/preempt/${data}`)
}
function* preempt(action){
  try{
    // yield call(preemptAPI(action.data))
    yield delay(500);
    console.log(action.data);
    throw new Error('이미 존재하는 아이디 입니다.')
    yield put({
      type:PREEMPT_SUCCESS,
      data:action.data
    })
  }catch(e){
    yield put({
      type:PREEMPT_FAILURE,
      error : e,
    })
  }
}
function* watchPreempt(){
  yield takeLatest(PREEMPT_REQUEST, preempt);
}
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchChangeTo),
    fork(watchPreempt),
  ]);
}
