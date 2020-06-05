import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
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

const dummyComment=[
    {
        datetime:"2020-04-26",
        content:"깔끔하고 너무 좋습니다",
        profile:"우기재",
        author:"우기재",
        rating:5,
    },
    {
        datetime:"2020-04-25",
        content:"꽤괜;",
        profile:"뚜요니",
        author:"뚜요니",
        rating:4,
    },
    {
        datetime:"2020-04-25",
        content:"약간 좁은 듯한 느낌",
        profile:"우기재",
        author:"우기재",
        rating:3,
    },
    {
        datetime:"2020-04-24",
        content:"아 이게 뭐야",
        profile:"우기재",
        author:"우기재",
        rating:1,
    },
    {
        datetime:"2020-04-23",
        content:"정류장에서 조금 걸어야 합니다",
        profile:"뚜요니",
        author:"뚜요니",
        rating:5,
    },
]
function selectAPI() {
  // 서버에 요청을 보내는 부분
    return axios.post('/stadium');
}

function* select() {
    try {
        // yield call(selectAPI);
        yield delay(2000);
        yield put({ // put은 dispatch 동일
            type: SELECT_STADIUM_SUCCESS,
            data: dummyComment,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SELECT_STADIUM_FAILURE,
            error:e,
        });
    }
}

function* watchSelect() {
    yield takeEvery(SELECT_STADIUM_REQUEST, select);
}

function enrollAPI() {
  // 서버에 요청을 보내는 부분
    return axios.post('/stadium/register');
}

function* enroll() {
    try {
        // yield call(enrollAPI);
        yield delay(2000);
        // throw new Error('에러에러에러');
        yield put({ // put은 dispatch 동일
            type: ENROLL_STADIUM_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: ENROLL_STADIUM_FAILURE,
            error: e,
        });
    }
}

function* watchEnroll() {
    yield takeEvery(ENROLL_STADIUM_REQUEST, enroll);
}
///////////////////////////////////////////////////////
function addCommentAPI(data){
    return axios.post(`/stadium/`, data);
}

function* add(action){
    try{
        // yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:[action.data, ...dummyComment]
        });
    }catch(e){
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:e,
        })
    }
}
function* watchAddComment(){
    yield takeEvery(ADD_COMMENT_REQUEST, add);
}
export default function* userSaga() {
    yield all([
        fork(watchSelect),
        fork(watchEnroll),
        fork(watchAddComment),
    ]);
}
