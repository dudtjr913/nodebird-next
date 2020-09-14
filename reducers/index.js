import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

const initialState = {
	user: {},
	post: {},
};

const reducer = combineReducers({
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				console.log('HYDRATE', action); //HYDRATE는 ssr을 위한 것
				return {
					...state,
					...action.payload,
				};
			default:
				return state;
		}
	},
	user,
	post,
});

export default reducer;
