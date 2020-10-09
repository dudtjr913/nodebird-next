import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

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
          id: 11,
          src: 'https://velopert.com/wp-content/uploads/2016/03/react.png',
        },
        {
          id: 12,
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          id: 13,
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          id: 14,
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
        {
          id: 15,
          src:
            'https://blog.kakaocdn.net/dn/PAkOZ/btqxwEMvpqH/iBiyldE1hv8avELugFhgYk/img.jpg',
        },
        {
          id: 16,
          src:
            'https://media.vlpt.us/images/mtmin/post/1a9ed69e-db6c-41f3-8763-dd0f723ad1a5/react-redux.png',
        },
      ],
      Comments: [
        {
          id: 2,
          User: {
            email: 'dudtjr913@naver.com',
            nickname: 'Yeong',
          },
          content: '댓글댓글',
        },
        {
          id: 3,
          User: {
            email: 'hybam@naver.com',
            nickname: 'Cheon',
          },
          content: '과연과연',
        },
      ],
    },
  ],
  imagePaths: [],

  hasPosts: true, // 포스트 로딩을 위한 포스트 데이터를 가지고 있는지에 대한 여부(너무 많으면 컷하기 위함)

  postLoadLoading: false, // 포스트 로딩
  postLoadDone: false,
  postLoadError: false,

  postAddLoading: false, // 포스트 추가
  postAddDone: false,
  postAddError: false,

  postRemoveLoading: false, // 포스트 삭제
  postRemoveDone: false,
  postRemoveError: false,

  commentAddLoading: false, // 댓글 추가
  commentAddDone: false,
  commentAddError: false,
};

export const infinitePosts = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        email: faker.internet.email(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
      Images: [
        {
          id: shortId.generate(),
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            email: faker.internet.email(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.postLoadLoading = true;
        draft.postLoadDone = false;
        draft.postLoadError = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.postLoadLoading = false;
        draft.postLoadDone = true;
        draft.postLoadError = false;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasPosts = draft.mainPosts.length < 50;
        break;

      case LOAD_POST_FAILURE:
        draft.postLoadLoading = false;
        draft.postLoadDone = false;
        draft.postLoadError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.postAddLoading = true;
        draft.postAddDone = false;
        draft.postAddError = false;
        break;

      case ADD_POST_SUCCESS:
        draft.postAddLoading = false;
        draft.postAddDone = true;
        draft.postAddError = false;
        draft.mainPosts.unshift(action.data);
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
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.push(action.data);
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
