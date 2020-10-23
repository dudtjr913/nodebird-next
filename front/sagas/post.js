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
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsData(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`); // get에서 데이터를 넣는 법 -> 쿼리스트링
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsData, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostData(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostData, action.data);
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

function loadUserPostsData(id, lastId) {
  return axios.get(`/posts/user/${id}?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(
      loadUserPostsData,
      action.data.id,
      action.data.lastId,
    );
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
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

function removePostData(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostData, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesData(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesData, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retweetData(data) {
  return axios.post(`/post/${data}/retweet`, data);
}

function* retweet(action) {
  try {
    const result = yield call(retweetData, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchAddLike),
    fork(watchRemoveLike),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
