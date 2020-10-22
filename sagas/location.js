import { all, fork, put, call, debounce } from 'redux-saga/effects';
import axios from 'axios';
import {
  REFRESH_STADIUMLIST_REQUEST,
  REFRESH_STADIUMLIST_SUCCESS,
  REFRESH_STADIUMLIST_FAILURE,
} from '../reducers/location';

function refreshStadiumListAPI(action) {
  return axios.patch('/stadia', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* refreshStadiumList(action) {
  try {
    console.log('------------------------------------');
    console.log(action);
    console.log('------------------------------------');
    const result = yield call(refreshStadiumListAPI, action);
    yield put({
      type: REFRESH_STADIUMLIST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REFRESH_STADIUMLIST_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchRefreshStadiumList() {
  yield debounce(400, REFRESH_STADIUMLIST_REQUEST, refreshStadiumList);
}

export default function* locationSaga() {
  yield all([
    fork(watchRefreshStadiumList),
  ]);
}
