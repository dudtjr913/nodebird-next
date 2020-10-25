import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],

  hasPosts: true, // 포스트 로딩을 위한 포스트 데이터를 가지고 있는지에 대한 여부(너무 많으면 컷하기 위함)
  singlePost: null, // 개별 포스트

  postsLoadLoading: false, // 포스트 로딩
  postsLoadDone: false,
  postsLoadError: false,

  postLoadLoading: false, // 개별 포스트 로딩
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

  reCommentAddLoading: false, // 답글 추가
  reCommentAddDone: false,
  reCommentAddError: false,

  commentRemoveLoading: false, // 댓글 삭제
  commentRemoveDone: false,
  commentRemoveError: false,

  reCommentRemoveLoading: false, // 답글 삭제
  reCommentRemoveDone: false,
  reCommentRemoveError: false,

  addLikeLoading: false, // 좋아요 추가
  addLikeDone: false,
  addLikeError: false,

  removeLikeLoading: false, // 좋아요 삭제
  removeLikeDone: false,
  removeLikeError: false,

  uploadImagesLoading: false, // 이미지 업로드
  uploadImagesDone: false,
  uploadImagesError: false,

  retweetLoading: false, // 리트윗 요청
  retweetDone: false,
  retweetError: false,
};

export const ADD_LIKE_REQUEST = 'ADD_LIKE_REQUEST';
export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const ADD_LIKE_FAILURE = 'ADD_LIKE_FAILURE';

export const REMOVE_LIKE_REQUEST = 'REMOVE_LIKE_REQUEST';
export const REMOVE_LIKE_SUCCESS = 'REMOVE_LIKE_SUCCESS';
export const REMOVE_LIKE_FAILURE = 'REMOVE_LIKE_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_HASHTAG_REQUEST = 'LOAD_HASHTAG_REQUEST';
export const LOAD_HASHTAG_SUCCESS = 'LOAD_HASHTAG_SUCCESS';
export const LOAD_HASHTAG_FAILURE = 'LOAD_HASHTAG_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const REMOVE_RECOMMENT_REQUEST = 'REMOVE_RECOMMENT_REQUEST';
export const REMOVE_RECOMMENT_SUCCESS = 'REMOVE_RECOMMENT_SUCCESS';
export const REMOVE_RECOMMENT_FAILURE = 'REMOVE_RECOMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_UPLOAD_IMAGE = 'REMOVE_UPLOAD_IMAGE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_LIKE_REQUEST:
        draft.addLikeLoading = true;
        draft.addLikeDone = false;
        draft.addLikeError = false;
        break;

      case ADD_LIKE_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.addLikeLoading = false;
        draft.addLikeDone = true;
        draft.addLikeError = false;
        break;
      }

      case ADD_LIKE_FAILURE:
        draft.addLikeLoading = false;
        draft.addLikeDone = false;
        draft.addLikeError = action.error;
        break;

      case REMOVE_LIKE_REQUEST:
        draft.removeLikeLoading = true;
        draft.removeLikeDone = false;
        draft.removeLikeError = false;
        break;

      case REMOVE_LIKE_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        const unlikeIndex = post.Likers.findIndex(
          (v) => v.id === action.data.UserId,
        );
        post.Likers.splice(unlikeIndex, 1);
        draft.removeLikeLoading = false;
        draft.removeLikeDone = true;
        draft.removeLikeError = false;
        break;
      }

      case REMOVE_LIKE_FAILURE:
        draft.removeLikeLoading = false;
        draft.removeLikeDone = false;
        draft.removeLikeError = action.error;
        break;
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.postsLoadLoading = true;
        draft.postsLoadDone = false;
        draft.postsLoadError = false;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.postsLoadLoading = false;
        draft.postsLoadDone = true;
        draft.postsLoadError = false;
        Array.prototype.push.apply(draft.mainPosts, action.data);
        draft.hasPosts = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.postsLoadLoading = false;
        draft.postsLoadDone = false;
        draft.postsLoadError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.postLoadLoading = true;
        draft.postLoadDone = false;
        draft.postLoadError = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.postLoadLoading = false;
        draft.postLoadDone = true;
        draft.postLoadError = false;
        draft.singlePost = action.data;
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
        draft.imagePaths = [];
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

      case ADD_RECOMMENT_REQUEST:
        draft.reCommentAddLoading = true;
        draft.reCommentAddDone = false;
        draft.reCommentAddError = false;
        break;

      case ADD_RECOMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === action.data.PostId,
        );
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          (v) => v.id === action.data.CommentId,
        );
        draft.mainPosts[postIndex].Comments[commentIndex].ReComments.push(
          action.data,
        );
        draft.reCommentAddLoading = false;
        draft.reCommentAddDone = true;
        draft.reCommentAddError = false;
        break;
      }

      case ADD_RECOMMENT_FAILURE:
        draft.reCommentAddLoading = false;
        draft.reCommentAddDone = false;
        draft.reCommentAddError = action.error;
        break;

      case REMOVE_COMMENT_REQUEST:
        draft.commentRemoveLoading = true;
        draft.commentRemoveDone = false;
        draft.commentRemoveError = false;
        break;

      case REMOVE_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === action.data.PostId,
        );
        console.log(postIndex);
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          (v) => v.id === action.data.id,
        );
        draft.mainPosts[postIndex].Comments.splice(commentIndex, 1);
        draft.commentRemoveLoading = false;
        draft.commentRemoveDone = true;
        draft.commentRemoveError = false;
        break;
      }

      case REMOVE_COMMENT_FAILURE:
        draft.commentRemoveLoading = false;
        draft.commentRemoveDone = false;
        draft.commentRemoveError = action.error;
        break;

      case REMOVE_RECOMMENT_REQUEST:
        draft.reCommentRemoveLoading = true;
        draft.reCommentRemoveDone = false;
        draft.reCommentRemoveError = false;
        break;

      case REMOVE_RECOMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          (v) => v.id === action.data.PostId,
        );
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          (v) => v.id === action.data.CommentId,
        );
        const reCommentIndex = draft.mainPosts[postIndex].Comments[
          commentIndex
        ].ReComments.findIndex((v) => v.id === action.data.ReCommentId);

        draft.mainPosts[postIndex].Comments[commentIndex].ReComments.splice(
          reCommentIndex,
          1,
        );
        draft.reCommentRemoveLoading = false;
        draft.reCommentRemoveDone = true;
        draft.reCommentRemoveError = false;
        break;
      }

      case REMOVE_RECOMMENT_FAILURE:
        draft.reCommentRemoveLoading = false;
        draft.reCommentRemoveDone = false;
        draft.reCommentRemoveError = action.error;
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

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = false;
        break;

      case UPLOAD_IMAGES_SUCCESS:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.uploadImagesError = false;
        action.data.forEach((v) => draft.imagePaths.push(v));
        break;

      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = action.error;
        break;

      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = false;
        break;

      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.retweetError = false;
        draft.mainPosts.unshift(action.data);
        break;

      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetDone = false;
        draft.retweetError = action.error;
        break;

      case REMOVE_UPLOAD_IMAGE:
        draft.imagePaths.splice(action.data, 1);
        break;

      default:
        break;
    }
  });

export default reducer;
