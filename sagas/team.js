import { all, delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    SELECT_TEAM_FAILURE,
    SELECT_TEAM_REQUEST,
    SELECT_TEAM_SUCCESS,
    ENROLL_TEAM_FAILURE,
    ENROLL_TEAM_REQUEST,
    ENROLL_TEAM_SUCCESS,
    LOAD_LIST_REQUEST,
    LOAD_LIST_SUCCESS,
    LOAD_LIST_FAILURE,
    SEARCH_TEAMS_REQUEST,
    SEARCH_TEAMS_SUCCESS,
    SEARCH_TEAMS_FAILURE,
} from '../reducers/team';

function selectAPI() {
  // 서버에 요청을 보내는 부분
    return axios.post('/team');
}

function* select() {
    try {
        // yield call(selectAPI);
        yield delay(2000);
        yield put({ // put은 dispatch 동일
            type: SELECT_TEAM_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SELECT_TEAM_FAILURE,
            error:e,
        });
    }
}

function* watchSelect() {
    yield takeEvery(SELECT_TEAM_REQUEST, select);
}

function enrollAPI() {
  // 서버에 요청을 보내는 부분
    return axios.post('/team/register');
}

function* enroll() {
    try {
        // yield call(enrollAPI);
        yield delay(2000);
        throw new Error('에러에러에러');
        yield put({ // put은 dispatch 동일
            type: ENROLL_TEAM_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: ENROLL_TEAM_FAILURE,
            error: e,
        });
    }
}

function* watchEnroll() {
    yield takeEvery(ENROLL_TEAM_REQUEST, enroll);
}

function loadAPI(){
    return axios.get('/team/rank');
}
function* load(){
    try{
        // yield call(loadAPI);
        yield delay(1000);
        yield put({
            type:LOAD_LIST_SUCCESS,
        })
    } catch (e) {
        yield put({
            type:LOAD_LIST_FAILURE,
            error: e,
        })
    }
}
function* watchLoad(){
    yield takeEvery(LOAD_LIST_REQUEST, load);
}

function searchAPI(query){
    if(query.indexOf("지역검색 :") === 0){
        return axios.get(`team/search?loc=${query}`);
    }else{
        return axios.get(`team/search?q=${query}`);
    }
}
function* search(action){
    try{
        //yield call(searchAPI(action.data..query));
        yield delay(1000);
        yield put({
            type:SEARCH_TEAMS_SUCCESS,
        })
    }catch (e) {
        yield put({
            type:SEARCH_TEAMS_FAILURE,
            error:e,
        })
    }
}
function* watchSearch(){
    yield takeLatest(SEARCH_TEAMS_REQUEST, search);
}
export default function* userSaga() {
    yield all([
        fork(watchSelect),
        fork(watchEnroll),
        fork(watchLoad),
        fork(watchSearch),
    ]);
}
