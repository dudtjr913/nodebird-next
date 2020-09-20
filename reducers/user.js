import produce from 'immer';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: false,

  logOutLoading: false,
  logOutDone: false,
  logOutError: false,

  signUpLoading: false,
  signUpDone: false,
  signUpError: false,

  user: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: '과연',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '슬기' }, { nickname: '영석스' }],
  Followers: [{ nickname: '슬기' }, { nickname: '영석스' }],
});

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signUpAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = false;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.logInError = false;
        draft.logOutDone = true;
        draft.user = dummyUser(action.data);
        break;

      case LOG_IN_FAILURE:
        draft.user = null;
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = false;
        break;

      case LOG_OUT_SUCCESS:
        draft.logInDone = false;
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = false;
        draft.user = null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = false;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.signUpError = false;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME: {
        const removePost = draft.user.Posts.findIndex(
          (v) => v.id === action.data,
        );
        draft.user.Posts.splice(removePost, 1);
        break;
      }

      default:
        break;
    }
  });

export default reducer;
