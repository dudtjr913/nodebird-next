export const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 'yeongseok',
				nickname: '영석',
			},
			content: '과연 될까? #노드버드 #성공',
			Images: [
				{
					src: 'https://velopert.com/wp-content/uploads/2016/03/react.png',
				},
				{
					src:
						'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
				},
				{
					src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
				},
				{
					src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
				},
				{
					src:
						'https://blog.kakaocdn.net/dn/PAkOZ/btqxwEMvpqH/iBiyldE1hv8avELugFhgYk/img.jpg',
				},
				{
					src:
						'https://media.vlpt.us/images/mtmin/post/1a9ed69e-db6c-41f3-8763-dd0f723ad1a5/react-redux.png',
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
	postAddLoading: false,
	postAddDone: false,
	postAddError: false,

	commentAddLoading: false,
	commentAddDone: false,
	commentAddError: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => {
	return { type: ADD_POST_REQUEST, data };
};

export const addComment = (data) => {
	return { type: ADD_COMMENT_REQUEST, data };
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
		case ADD_POST_REQUEST:
			return {
				...state,
				postAddLoading: true,
				postAddError: false,
			};
		case ADD_POST_SUCCESS:
			const dummyContent = { ...dummyPost };
			dummyContent.content = action.data;
			return {
				...state,
				mainPosts: [dummyContent, ...state.mainPosts],
				postAddLoading: false,
				postAddDone: true,
				postAddError: false,
			};
		case ADD_POST_FAILURE:
			return {
				...state,
				postAddLoading: false,
				postAddDone: false,
				postAddError: action.error,
			};
		case ADD_COMMENT_REQUEST:
			return {
				...state,
				commentAddLoading: true,
				commentAddError: false,
			};
		case ADD_COMMENT_SUCCESS:
			const dummyComment = { ...dummyPost };
			dummyComment.Comments = action.data; // 아직 미구현
			return {
				...state,
				mainPosts: [dummyComment, ...state.mainPosts],
				commentAddLoading: false,
				commentAddDone: true,
				commentAddError: false,
			};
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				commentAddLoading: false,
				commentAddDone: false,
				commentAddError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
