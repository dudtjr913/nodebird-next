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
import {
  REMOVE_POST_REQUEST,
  ADD_LIKE_REQUEST,
  REMOVE_LIKE_REQUEST,
  RETWEET_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commented, setCommented] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { postRemoveLoading } = useSelector((state) => state.post);
  const email = me?.email;

  const onLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    console.log(post.id);
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

  const handleOnPostRemove = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [me]);

  const handleOnComment = useCallback(() => setCommented((prev) => !prev), []);

  const like = me && post.Likers.find((v) => v.id === post.User.id);

  return (
    <div>
      <Card
        style={{ width: '90%', margin: 'auto' }}
        cover={post.Images[0] && <PostImages images={post.Images} />}
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
                {email && email === post.User.email ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={handleOnPostRemove}
                      loading={postRemoveLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button danger>신고</Button>
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
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commented && (
        <div>
          {me && <CommentForm post={post} />}
          <List
            style={{ width: '90%', margin: 'auto' }}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(comments) => (
              <li>
                <Comment
                  actions={[<span key="reply-comment">답장</span>]}
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
                />
              </li>
            )}
          />
        </div>
      )}
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
