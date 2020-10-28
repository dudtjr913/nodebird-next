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

  followLoading: false,
  followDone: false,
  followError: false,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: false,

  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: false,

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: false,

  loadMyFollowingsLoading: false,
  loadMyFollowingsDone: false,
  loadMyFollowingsError: false,

  loadMyFollowersLoading: false,
  loadMyFollowersDone: false,
  loadMyFollowersError: false,

  removeMyFollowerLoading: false,
  removeMyFollowerDone: false,
  removeMyFollowerError: false,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: false,

  me: null,
  user: null,
  myReportLists: null,

  followingPostId: null,
  unfollowingPostId: null,

  hasMoreFollowings: true, // 팔로워, 팔로잉 데이터를 더 가지고 있는지
  hasMoreFollowers: true,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const LOAD_MY_FOLLOWINGS_REQUEST = 'LOAD_MY_FOLLOWINGS_REQUEST';
export const LOAD_MY_FOLLOWINGS_SUCCESS = 'LOAD_MY_FOLLOWINGS_SUCCESS';
export const LOAD_MY_FOLLOWINGS_FAILURE = 'LOAD_MY_FOLLOWINGS_FAILURE';

export const LOAD_MY_FOLLOWERS_REQUEST = 'LOAD_MY_FOLLOWERS_REQUEST';
export const LOAD_MY_FOLLOWERS_SUCCESS = 'LOAD_MY_FOLLOWERS_SUCCESS';
export const LOAD_MY_FOLLOWERS_FAILURE = 'LOAD_MY_FOLLOWERS_FAILURE';

export const REMOVE_MY_FOLLOWER_REQUEST = 'REMOVE_MY_FOLLOWER_REQUEST';
export const REMOVE_MY_FOLLOWER_SUCCESS = 'REMOVE_MY_FOLLOWER_SUCCESS';
export const REMOVE_MY_FOLLOWER_FAILURE = 'REMOVE_MY_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';
export const LOAD_MY_REPORT_LISTS = 'LOAD_MY_REPORT_LISTS';

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const followAction = (data) => ({
  type: FOLLOW_REQUEST,
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
        draft.me = action.data;
        break;

      case LOG_IN_FAILURE:
        draft.me = null;
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
        draft.me = null;
        draft.signUpDone = false;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
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
        draft.me.Posts.unshift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME: {
        const removePost = draft.me.Posts.findIndex(
          (v) => v.id === action.data,
        );
        draft.me.Posts.splice(removePost, 1);
        break;
      }
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = false;
        draft.followingPostId = action.data.postId;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.followError = false;
        draft.me.Followings.push({ id: action.data.UserId });
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followDone = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = false;
        draft.unfollowingPostId = action.data.postId
          ? action.data.postId
          : null;
        break;

      case UNFOLLOW_SUCCESS:
        {
          const index = draft.me.Followings.findIndex(
            (v) => v.id === action.data.UserId,
          );
          if (draft.loadMyFollowersDone) {
            draft.loadMyFollowingsDone.splice(index, 1);
          }
          draft.me.Followings.splice(index, 1);
          draft.unfollowLoading = false;
          draft.unfollowDone = true;
          draft.unfollowError = false;
        }
        break;

      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowDone = false;
        draft.unfollowError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = false;
        break;

      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.loadUserError = false;
        draft.user = action.data;
        break;

      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loadUserError = action.error;
        break;

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.loadMyInfoError = false;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = action.error;
        break;

      case LOAD_MY_FOLLOWINGS_REQUEST:
        draft.loadMyFollowingsLoading = true;
        draft.loadMyFollowingsError = false;
        break;

      case LOAD_MY_FOLLOWINGS_SUCCESS:
        draft.loadMyFollowingsLoading = false;
        draft.loadMyFollowingsDone = action.data;
        draft.loadMyFollowingsError = false;
        draft.hasMoreFollowings =
          draft.loadMyFollowingsDone.length !== draft.me.Followings.length;
        // 로드한 팔로잉 수와 기존의 내 팔로잉 수가 같으면 더보기 버튼 없애기
        break;

      case LOAD_MY_FOLLOWINGS_FAILURE:
        draft.loadMyFollowingsLoading = false;
        draft.loadMyFollowingsError = action.error;
        break;

      case LOAD_MY_FOLLOWERS_REQUEST:
        draft.loadMyFollowersLoading = true;
        draft.loadMyFollowersDone = null;
        draft.loadMyFollowersError = false;
        break;

      case LOAD_MY_FOLLOWERS_SUCCESS:
        draft.loadMyFollowersLoading = false;
        draft.loadMyFollowersDone = action.data;
        draft.loadMyFollowersError = false;
        draft.hasMoreFollowers =
          draft.loadMyFollowersDone.length !== draft.me.Followers.length;

        break;

      case LOAD_MY_FOLLOWERS_FAILURE:
        draft.loadMyFollowersLoading = false;
        draft.loadMyFollowersDone = null;
        draft.loadMyFollowersError = action.error;
        break;

      case REMOVE_MY_FOLLOWER_REQUEST:
        draft.removeMyFollowerLoading = true;
        draft.removeMyFollowerError = false;
        break;

      case REMOVE_MY_FOLLOWER_SUCCESS: {
        const followerIndex = draft.me.Followers.findIndex(
          (v) => v.id === action.data.id,
        );
        draft.me.Followers.splice(followerIndex, 1);
        draft.loadMyFollowersDone.splice(followerIndex, 1);
        draft.removeMyFollowerLoading = false;
        draft.removeMyFollowerDone = true;
        draft.removeMyFollowerError = false;
        break;
      }

      case REMOVE_MY_FOLLOWER_FAILURE:
        draft.removeMyFollowerLoading = false;
        draft.removeMyFollowerDone = false;
        draft.removeMyFollowerError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = false;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.changeNicknameError = false;
        draft.me.nickname = action.data;
        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      case LOAD_MY_REPORT_LISTS:
        draft.myReportLists = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
