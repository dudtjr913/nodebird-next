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
