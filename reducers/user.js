export const initialState = {
	isLoggedIn: false,
	isLoggingIn: false, //로그인 중
	user: null,
	signUpData: {},
	loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const loginRequestAction = (data) => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};

export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST:
			return {
				...state,
				isLoggingIn: true,
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				user: action.data,
				isLoggingIn: false,
				isLoggedIn: true,
			};
		case LOG_IN_FAILURE:
			return {
				...state,
				user: null,
				isLoggedIn: false,
				isLoggingIn: false,
			};
		case LOG_OUT_REQUEST:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
};

export default reducer;
