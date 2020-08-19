import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
import messenger from './messenger';
import post from './post';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(location),
    fork(stadium),
    fork(team),
    fork(messenger),
    fork(post),
  ]);
}