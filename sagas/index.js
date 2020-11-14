import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
// import messenger from './messenger';
import matches from './matches';
import post from './post';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(location),
    fork(stadium),
    fork(team),
    fork(matches),
    fork(post),
  ]);
}