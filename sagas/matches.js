import axios from 'axios';
import { all, fork, put, call, takeLatest } from 'redux-saga/effects';

import {
  SELECT_MATCHES_REQUEST,
  SELECT_MATCHES_SUCCESS,
  SELECT_MATCHES_FAILURE,
  PATCH_APPROVAL_REQUEST,
  PATCH_APPROVAL_SUCCESS,
  PATCH_APPROVAL_FAILURE,
  PATCH_CANCEL_REQUEST,
  PATCH_CANCEL_SUCCESS,
  PATCH_CANCEL_FAILURE,
  PATCH_LOSER_REQUEST,
  PATCH_LOSER_SUCCESS,
  PATCH_LOSER_FAILURE,
  PATCH_WINNER_REQUEST,
  PATCH_WINNER_SUCCESS,
  PATCH_WINNER_FAILURE,
} from '../reducers/matches';

function loadMatchesAPI(action) {
  return axios.get(`/match/team/${action.data.teamId}`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* loadMatches(action) {
  try {
    const result = yield call(loadMatchesAPI, action);
    yield put({
      type: SELECT_MATCHES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELECT_MATCHES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMatches() {
  yield takeLatest(SELECT_MATCHES_REQUEST, loadMatches);
}

function patchWinnerAPI(action) {
  return axios.patch(`/match/${action.data.matchId}/winner/${action.data.teamId}`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* patchWinner(action) {
  try {
    const result = yield call(patchWinnerAPI, action);
    yield put({
      type: PATCH_WINNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PATCH_WINNER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPatchWinner() {
  yield takeLatest(PATCH_WINNER_REQUEST, patchWinner);
}

function patchLoserAPI(action) {
  return axios.patch(`/match/${action.data.matchId}/loser/${action.data.teamId}`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* patchLoser(action) {
  try {
    const result = yield call(patchLoserAPI, action);
    yield put({
      type: PATCH_LOSER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PATCH_LOSER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPatchLoser() {
  yield takeLatest(PATCH_LOSER_REQUEST, patchLoser);
}

function patchApprovalAPI(action) {
  return axios.patch(`/match/${action.data.matchId}/approve`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* patchApproval(action) {
  try {
    const result = yield call(patchApprovalAPI, action);
    yield put({
      type: PATCH_APPROVAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PATCH_APPROVAL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPatchApproval() {
  yield takeLatest(PATCH_APPROVAL_REQUEST, patchApproval);
}

function patchCancelAPI(action) {
  return axios.patch(`/match/${action.data.matchId}/cancel`, null, { headers: { Authorization: `Bearer ${action.token}` } });
}

function* patchCancel(action) {
  try {
    const result = yield call(patchCancelAPI, action);
    yield put({
      type: PATCH_CANCEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PATCH_CANCEL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPatchCancel() {
  yield takeLatest(PATCH_CANCEL_REQUEST, patchCancel);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMatches),
    fork(watchPatchWinner),
    fork(watchPatchLoser),
    fork(watchPatchApproval),
    fork(watchPatchCancel),
  ]);
}
