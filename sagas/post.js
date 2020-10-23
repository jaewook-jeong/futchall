import axios from 'axios';
import shortId from 'shortid';
import { all, fork, put, call, takeLatest, throttle } from 'redux-saga/effects';

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  SELECT_POST_REQUEST,
  SELECT_POST_SUCCESS,
  SELECT_POST_FAILURE
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
  return axios.get(`/posts?where=${data.where}&id=${data.id}&lastId=${data.lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(action) {
  if (data.where === 'team') {
    return axios.post('/post/team', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
  }
  return axios.post('/post/stadium', action.data, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(action) {
  return axios.delete(`/post/${action.data.id}`, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data.PostId,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data.PostId,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(action) {
  return axios.post(`/post/${action.data.postId}/comment`, action.data, { headers: { Authorization: `Bearer ${action.token}` }});
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function selectPostAPI(data) {
  return axios.get(`/post/${data.id}`);
}

function* selectPost(action) {
  try {
    const result = yield call(selectPostAPI, action.data);
    yield put({
      type: SELECT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELECT_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSelectPost() {
  yield takeLatest(SELECT_POST_REQUEST, selectPost);
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchUploadImages),
    fork(watchSelectPost),
  ]);
}
