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

const dummyComment = [
  {
    id: 1,
    datetime: '2020-04-26',
    content: '깔끔하고 너무 좋습니다',
    profile: '우기재',
    author: '우기재',
    rating: 5,
  },
  {
    id: 2,
    datetime: '2020-04-25',
    content: '꽤괜;',
    profile: '뚜요니',
    author: '뚜요니',
    rating: 4,
  },
  {
    id: 3,
    datetime: '2020-04-25',
    content: '약간 좁은 듯한 느낌',
    profile: '우기재',
    author: '우기재',
    rating: 3,
  },
  {
    id: 4,
    datetime: '2020-04-24',
    content: '아 이게 뭐야',
    profile: '우기재',
    author: '우기재',
    rating: 1,
  },
  {
    id: 5,
    datetime: '2020-04-23',
    content: '정류장에서 조금 걸어야 합니다',
    profile: '뚜요니',
    author: '뚜요니',
    rating: 5,
  },
];
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
    console.log('------------------------------------');
    console.log(action.data);
    console.log('------------------------------------');
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
