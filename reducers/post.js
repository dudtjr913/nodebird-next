export const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 'yeongseok',
				nickname: '영석',
			},
			content: '과연 될까?',
			Images: [
				{
					src:
						'https://lh3.googleusercontent.com/NMaV7YqpGLsUHf3drTmT3sfQ2XmFdP7-DyW9vG3AkSWyRv3GWEu9BiRk1jWE1F1ojbA',
				},
			],
			Comments: [
				{
					User: {
						nickname: 'Yeong',
					},
					content: '댓글댓글',
				},
				{
					User: {
						nickname: 'Cheon',
					},
					content: '과연과연',
				},
			],
		},
	],
	imagePaths: [],
	postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
	type: ADD_POST,
};

const dummyPost = {
	id: 2,
	content: '더미데이터',
	User: {
		id: 'cheon',
		nickname: '영석',
	},
	Images: [],
	Comments: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				mainPosts: [dummyPost, ...state.mainPosts],
				postAdded: true,
			};
		default:
			return state;
	}
};

export default reducer;
