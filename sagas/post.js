import { put, all, fork, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostData(data) {
	return axios.post('/api/addpost', data);
	//원래는 서버에 요청해야하지만 지금은 서버가 없으므로 사용하지 않음
}

function* addPost(action) {
	try {
		//const result = yield call(logInData(action.data))
		yield delay(1000);
		yield put({
			type: ADD_POST_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: ADD_POST_FAILURE,
			error: err.response.data,
		});
	}
}

function addCommentData(data) {
	return axios.post('/api/addcomment', data);
	//원래는 서버에 요청해야하지만 지금은 서버가 없으므로 사용하지 않음
}

function* addComment(action) {
	try {
		//const result = yield call(addCommentData(action.data))
		yield delay(1000);
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* rootSaga() {
	yield all([fork(watchAddPost), fork(watchAddComment)]);
}
