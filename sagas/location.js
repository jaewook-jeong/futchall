import { all, fork, put, delay, call, debounce } from 'redux-saga/effects';
import axios from 'axios';
import {
  REFRESH_STADIUMLIST_REQUEST,
  REFRESH_STADIUMLIST_SUCCESS,
  REFRESH_STADIUMLIST_FAILURE,
} from '../reducers/location';

function refreshStadiumListAPI() {
  return axios.get('');
}

function* refreshStadiumList(action) {
  try {
    yield delay(1000);
    // yield call(refreshStadiumListAPI(action.data.??));
    yield put({
      type: REFRESH_STADIUMLIST_SUCCESS,
      //   tempdata
      data: [
        {
          id: 1, // 시퀀스
          title: '누상동 다목적 운동장', // 명칭
          tag: ['인도어풋살장', '무료'],
          lat: '37.5795876',
          lng: '126.9636324',
          address: '서울특별시 종로구 누상동 1-3',
          occupation: 'Y',
        },
        {
          id: 2, // 시퀀스
          title: '서대문 돌산구장', // 명칭
          tag: ['인조잔디축구장', '무료'],
          lat: '37.602835',
          lng: '126.945915',
          address: '서울 서대문구 홍은1동 10-305',
          occupation: 'N',
        },
        {
          id: 3, // 시퀀스
          title: '서울 농학교 풋살장', // 명칭
          tag: ['인도어풋살장', '무료'],
          lat: '37.584397',
          lng: '126.968567',
          address: '서울특별시 종로구 신교동 1-1',
          occupation: 'Y',
        },
      ],
    });
  } catch (e) {
    yield put({
      type: REFRESH_STADIUMLIST_FAILURE,
      error: e,
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
