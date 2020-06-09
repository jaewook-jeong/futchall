import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_LIST_REQUEST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILURE,
    DELETE_LIST_REQUEST,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAILURE,
} from '../reducers/messenger';

function getContactUserListAPI(id) {
  return axios.get(`user/${id}/contactList`);
}

function* getContactUserList(action) {
  try {
    yield delay(1000);
    // yield call(getContactUserListAPI(action.data.userId));
    yield put({
      type: GET_LIST_SUCCESS,
      data: [
        {
          id : 'suyeon9456',
          nickname : '뚜요니',
          clubreq : '1',
          clubname : '잔디FC',
          date : '2020-06-08',
        },{
          id : 'dnrlwo11',
          nickname : '우기',
          clubreq : '2',
          clubname : 'FC벌',
          date : '2020-06-07',
        },{
          id : 'everest88',
          nickname : '쿄쿄',
          clubreq : '3',
          clubname : '대신FC',
          date : '2020-06-06',
        }
    ]
    });
  } catch (e) {
    yield put({
      type: GET_LIST_FAILURE,
      error: e,
    });
  }
}

function* watchGetContactUserList() {
  yield takeLatest(GET_LIST_REQUEST, getContactUserList);
}

function deleteContactUserAPI(data) {
  return axios.post(`user/${data.id}/message/delete?delUser=${data.delUser}`);
}

function* deleteContactUser(action) {
  try {
    yield delay(1000);
    // yield call(deleteContactUserAPI(action.data));
    yield put({
      type: DELETE_LIST_SUCCESS,
      data: [
        {
          id : 'suyeon9456',
          nickname : '뚜요니',
          clubreq : '1',
          clubname : '잔디FC',
          date : '2020-06-08',
        },{
          id : 'dnrlwo11',
          nickname : '우기',
          clubreq : '2',
          clubname : 'FC벌',
          date : '2020-06-07',
        },{
          id : 'everest88',
          nickname : '쿄쿄',
          clubreq : '3',
          clubname : '대신FC',
          date : '2020-06-06',
        }
    ].filter(data=>data.id !== action.data.delUser)
    });
  } catch (e) {
    yield put({
      type: DELETE_LIST_FAILURE,
      error: e,
    });
  }
}

function* watchDeleteContactUser() {
  yield takeLatest(DELETE_LIST_REQUEST, deleteContactUser);
}
export default function* postSaga() {
  yield all([
    fork(watchGetContactUserList),
    fork(watchDeleteContactUser),
  ]);
}
