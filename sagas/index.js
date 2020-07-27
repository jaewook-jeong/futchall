import { all, fork } from 'redux-saga/effects';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
import messenger from './messenger';
import post from './post';

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