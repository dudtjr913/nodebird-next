import shortId from 'shortid';
import produce from 'immer';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        email: 'dudtjr913@naver.com',
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
            email: 'dudtjr913',
            nickname: 'Yeong',
          },
          content: '댓글댓글',
        },
        {
          User: {
            email: 'hybam',
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

  postRemoveLoading: false,
  postRemoveDone: false,
  postRemoveError: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({ type: ADD_POST_REQUEST, data });

export const addComment = (data) => ({ type: ADD_COMMENT_REQUEST, data });

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    email: data.email,
    nickname: data.nickname,
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data.text,
  User: {
    email: data.email,
    nickname: data.nickname,
  },
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.postAddLoading = true;
        draft.postAddDone = false;
        draft.postAddError = false;
        break;

      case ADD_POST_SUCCESS:
        draft.postAddLoading = false;
        draft.postAddDone = true;
        draft.postAddError = false;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;

      case ADD_POST_FAILURE:
        draft.postAddLoading = false;
        draft.postAddDone = false;
        draft.postAddError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.commentAddLoading = true;
        draft.commentAddDone = false;
        draft.commentAddError = false;
        break;

      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.push(dummyComment(action.data));
        draft.commentAddLoading = false;
        draft.commentAddDone = true;
        draft.commentAddError = false;
        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.commentAddLoading = false;
        draft.commentAddDone = false;
        draft.commentAddError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.postRemoveLoading = true;
        draft.postRemoveDone = false;
        draft.postRemoveError = false;
        break;

      case REMOVE_POST_SUCCESS: {
        draft.postRemoveLoading = false;
        draft.postRemoveDone = true;
        draft.postRemoveError = false;
        const removePost = draft.mainPosts.findIndex(
          (v) => v.id === action.data,
        );
        draft.mainPosts.splice(removePost, 1);
        break;
      }

      case REMOVE_POST_FAILURE:
        draft.postRemoveLoading = false;
        draft.postRemoveDone = false;
        draft.postRemoveError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
