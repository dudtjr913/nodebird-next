import { put, all, fork, delay, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsData() {
  return axios.get('/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsData);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostData(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostData, action.data);
    console.log(result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentData(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentData, action.data);
    console.log(result);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function addLikeData(data) {
  return axios.patch(`/post/${data}/like`);
}

function* addLike(action) {
  try {
    const result = yield call(addLikeData, action.data);
    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

function removeLikeData(data) {
  return axios.delete(`/post/${data}/unlike`);
}

function* removeLike(action) {
  try {
    const result = yield call(removeLikeData, action.data);
    yield put({
      type: REMOVE_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

/* function removePostData(data) {
  return axios.post('/api/removepost', data);
  // 원래는 서버에 요청해야하지만 지금은 서버가 없으므로 사용하지 않음
} */

function* removePost(action) {
  try {
    // const result = yield call(removePostData(action.data))
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPosts);
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

function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchRemoveLike() {
  yield takeLatest(REMOVE_LIKE_REQUEST, removeLike);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchAddLike),
    fork(watchRemoveLike),
  ]);
}
