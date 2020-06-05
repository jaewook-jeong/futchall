import { all, fork } from 'redux-saga/effects';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(location),
        fork(stadium),
        fork(team),
    ]);
}