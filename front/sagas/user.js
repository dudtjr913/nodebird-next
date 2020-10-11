import { put, all, fork, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_MY_FOLLOWINGS_REQUEST,
  LOAD_MY_FOLLOWINGS_SUCCESS,
  LOAD_MY_FOLLOWINGS_FAILURE,
  LOAD_MY_FOLLOWERS_REQUEST,
  LOAD_MY_FOLLOWERS_SUCCESS,
  LOAD_MY_FOLLOWERS_FAILURE,
  REMOVE_MY_FOLLOWER_REQUEST,
  REMOVE_MY_FOLLOWER_SUCCESS,
  REMOVE_MY_FOLLOWER_FAILURE,
} from '../reducers/user';

function logInData(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInData, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutData() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutData);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpData(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    yield call(signUpData, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followData(data) {
  return axios.patch(`/user/${data.userId}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followData, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowData(data) {
  return axios.delete(`/user/${data.userId}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowData, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyInfoData() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoData);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyFollowingsData() {
  return axios.get('/user/followings');
}

function* loadMyFollowings() {
  try {
    const result = yield call(loadMyFollowingsData);
    yield put({
      type: LOAD_MY_FOLLOWINGS_SUCCESS,
      data: result.data.map((v) => ({
        id: v.id,
        nickname: v.nickname,
      })), // 임시방편으로 해두었음 나중에 get method에서 through데이터를 제거할 방법을 찾으면 고쳐야 함
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyFollowersData() {
  return axios.get('/user/followers');
}

function* loadMyFollowers() {
  try {
    const result = yield call(loadMyFollowersData);
    yield put({
      type: LOAD_MY_FOLLOWERS_SUCCESS,
      data: result.data.map((v) => ({
        id: v.id,
        nickname: v.nickname,
      })), // 임시방편으로 해두었음 나중에 get method에서 through데이터를 제거할 방법을 찾으면 고쳐야 함
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function removeMyFollowerData(data) {
  return axios.delete(`/user/${data.userId}/follower`);
}

function* removeMyFollower(action) {
  try {
    const result = yield call(removeMyFollowerData, action.data);
    yield put({
      type: REMOVE_MY_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_MY_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameData(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameData, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadMyFollowings() {
  yield takeLatest(LOAD_MY_FOLLOWINGS_REQUEST, loadMyFollowings);
}

function* watchLoadMyFollowers() {
  yield takeLatest(LOAD_MY_FOLLOWERS_REQUEST, loadMyFollowers);
}

function* watchRemoveMyFollower() {
  yield takeLatest(REMOVE_MY_FOLLOWER_REQUEST, removeMyFollower);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadMyInfo),
    fork(watchLoadMyFollowings),
    fork(watchLoadMyFollowers),
    fork(watchRemoveMyFollower),
    fork(watchChangeNickname),
  ]);
}
