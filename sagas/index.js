import {
	take,
	put,
	takeEvery,
	all,
	call,
	fork,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
} from '../reducers/post';
import {
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	LOG_OUT_FAILURE,
} from '../reducers/user';

function logInData(data) {
	return axios.post('/api/login', data);
	//원래는 서버에 요청해야하지만 지금은 서버가 없으므로 사용하지 않음
}

function* logIn(action) {
	try {
		//const result = yield call(logInData(action.data))
		yield delay(1000);
		yield put({
			type: LOG_IN_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: LOG_IN_FAILURE,
			data: err.response.data,
		});
	}
}

function logOutData(data) {
	return axios.post('/api/logout', data);
	//원래는 서버에 요청해야하지만 지금은 서버가 없으므로 사용하지 않음
}

function* logOut(action) {
	try {
		//const result = yield call(logInData(action.data))
		yield delay(1000);
		yield put({
			type: LOG_OUT_SUCCESS,
		});
	} catch (err) {
		yield put({
			type: LOG_OUT_FAILURE,
			data: err.response.data,
		});
	}
}

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
		});
	} catch (err) {
		yield put({
			type: ADD_POST_FAILURE,
			data: err.response.data,
		});
	}
}

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* rootSaga() {
	yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
