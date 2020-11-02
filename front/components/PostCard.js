import React, { useCallback, useState } from 'react';
import { Card, Popover, Button, Avatar, Comment, List } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import PostForm from './PostForm';
import ReportForm from './ReportForm';
import PostEditImage from './PostEditImage';
import {
  REMOVE_POST_REQUEST,
  ADD_LIKE_REQUEST,
  REMOVE_LIKE_REQUEST,
  RETWEET_REQUEST,
  REMOVE_COMMENT_REQUEST,
  POST_EDIT_CANCEL,
  POST_EDIT_START,
} from '../reducers/post';
import FollowButton from './FollowButton';
import ReComment from './ReComment';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commented, setCommented] = useState(false);
  const [reCommentedId, setReCommentedId] = useState(null);
  const [reCommented, setReCommented] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [report, setReport] = useState(false);
  const { me, myReportLists } = useSelector((state) => state.user);
  const { postRemoveLoading, postEditing } = useSelector((state) => state.post);
  const email = me?.email;

  const onLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_LIKE_REQUEST,
      data: post.id,
    });
  }, [me]);

  const onRemoveLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_LIKE_REQUEST,
      data: post.id,
    });
  }, [me]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me]);

  const removeComment = useCallback(
    (commentId) => () => {
      const reConfirm = window.confirm('정말로 댓글을 삭제하시겠습니까?');
      if (!reConfirm) {
        return null;
      }
      return dispatch({
        type: REMOVE_COMMENT_REQUEST,
        commentId,
      });
    },
    [],
  );

  const addReComment = useCallback(
    (id) => () => {
      setReCommentedId((prev) => {
        if (prev === id) {
          return null;
        }
        return id;
      });
    },
    [reCommentedId],
  );

  const reCommentShow = useCallback(
    (commentId) => () => {
      setReCommented((prev) => {
        if (prev === commentId) {
          return null;
        }
        return commentId;
      });
    },
    [reCommented],
  );

  const handleOnReport = useCallback(() => {
    if (myReportLists && myReportLists.find((v) => v.PostId === post.id)) {
      return alert('이미 신고한 게시글입니다.');
    }
    setReport((prev) => !prev);
  }, [myReportLists]);

  const handleOnComment = useCallback(() => setCommented((prev) => !prev), []);

  const handleOnPostRemove = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    const reConfirm = window.confirm('정말로 게시글을 삭제하시겠습니까?');
    if (!reConfirm) {
      return null;
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [me]);

  const handleOnPostEdit = useCallback(() => {
    if (!postEditing) {
      dispatch({
        type: POST_EDIT_START,
      });
    } else if (postEditing && postEdit) {
      dispatch({
        type: POST_EDIT_CANCEL,
      });
    } else {
      return alert('수정은 한 번에 한 게시글만 가능합니다.');
    }
    setPostEdit((prev) => !prev);
  }, [postEditing, postEdit]);

  const like = me && post.Likers.find((v) => v.id === post.User.id);

  return (
    <div>
      <Card
        style={{ width: '90%', margin: 'auto' }}
        cover={
          (post.Images[0] && !postEdit && (
            <PostImages images={post.Images} />
          )) ||
          (post.Images[0] && postEdit && (
            <PostEditImage images={post.Images} postId={post.id} />
          ))
        }
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          like ? (
            <HeartTwoTone key="twotone" onClick={onRemoveLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={handleOnComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {email && email === post.User.email && !post.RetweetId && (
                  <Button onClick={handleOnPostEdit}>
                    {postEdit ? '취소' : '수정'}
                  </Button>
                )}
                {email && email === post.User.email ? (
                  <Button
                    type="danger"
                    onClick={handleOnPostRemove}
                    loading={postRemoveLoading}
                  >
                    삭제
                  </Button>
                ) : (
                  <Button onClick={handleOnReport} danger>
                    신고
                  </Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            title={
              <div>
                {`${post.User.nickname}님이 리트윗한 게시글입니다.`}
                <span
                  style={{
                    fontSize: '14px',
                    color: 'lightgray',
                    paddingLeft: '10px',
                  }}
                >
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            }
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>
                      {post.Retweet.User.nickname[0].toUpperCase()}
                    </Avatar>
                  </a>
                </Link>
              }
              title={
                <div>
                  <span>{post.Retweet.User.nickname}</span>
                  {me && email !== post.Retweet.User.email && (
                    <FollowButton
                      postId={post.Retweet.id}
                      userId={post.Retweet.User.id}
                    />
                  )}
                </div>
              }
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link href={`/user/${post.User.id}`}>
                <a>
                  <Avatar>{post.User.nickname[0].toUpperCase()}</Avatar>
                </a>
              </Link>
            }
            title={
              <div>
                <span>{post.User.nickname}</span>
                {me && email !== post.User.email && (
                  <FollowButton postId={post.id} userId={post.User.id} />
                )}
                <span
                  style={{
                    fontSize: '14px',
                    color: 'lightgray',
                    paddingLeft: '10px',
                  }}
                >
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            }
            description={
              postEdit ? (
                <PostForm
                  postEdit={postEdit}
                  content={post.content}
                  postId={post.id}
                  setPostEdit={setPostEdit}
                />
              ) : (
                <PostCardContent postData={post.content} />
              )
            }
          />
        )}
      </Card>
      {commented && (
        <div>
          {me && <CommentForm postId={post.id} commentId={0} />}
          <List
            style={{ width: '90%', margin: 'auto' }}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(comments) => (
              <li>
                <Comment
                  actions={[
                    <span
                      onClick={addReComment(comments.id)}
                      role="presentation"
                      key="reply-comment"
                    >
                      답장
                    </span>,
                    comments.ReComments.length >= 1 && (
                      <span
                        key="show-recomment"
                        onClick={reCommentShow(comments.id)}
                        role="presentation"
                      >
                        답글 보기
                      </span>
                    ),
                    me && me.id === comments.User.id && (
                      <span
                        onClick={removeComment(comments.id)}
                        role="presentation"
                        key="remove-comment"
                      >
                        삭제
                      </span>
                    ),
                  ]}
                  author={comments.User.nickname}
                  avatar={
                    <Link href={`/user/${comments.User.id}`}>
                      <a>
                        <Avatar>
                          {comments.User.nickname[0].toUpperCase()}
                        </Avatar>
                      </a>
                    </Link>
                  }
                  content={comments.content}
                  datetime={<span>{moment(comments.createdAt).fromNow()}</span>}
                >
                  {me && comments.id === reCommentedId && (
                    <CommentForm
                      reCommentDone={setReCommentedId}
                      postId={post.id}
                      commentId={comments.id}
                    />
                  )}
                  {comments.ReComments && reCommented === comments.id && (
                    <ReComment comments={comments} />
                  )}
                </Comment>
              </li>
            )}
          />
        </div>
      )}
      {report && <ReportForm setReport={setReport} postId={post.id} />}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    User: PropTypes.shape({
      email: PropTypes.string,
      nickname: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        User: PropTypes.shape({
          nickname: PropTypes.string,
        }),
        content: PropTypes.string,
      }),
    ),
    createdAt: PropTypes.string,
    Likers: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    ),
    RetweetId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
