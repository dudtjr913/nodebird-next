import React, { useCallback, useState, useEffect } from 'react';
import { Card, Popover, Button, Avatar, Comment, List, Tooltip } from 'antd';
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
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { postRemoveLoading } = useSelector((state) => state.post);
  const email = user?.email;

  useEffect(() => {
    if (!user) {
      setLiked(false);
    }
  }, [user]);

  const handleOnLike = useCallback(() => {
    if (!user) {
      return;
    }
    setLiked((prev) => !prev);
  }, [user]);

  const handleOnPostRemove = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const handleOnComment = useCallback(() => {
    setCommented((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        style={{ width: '90%', margin: 'auto' }}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone key="twotone" onClick={handleOnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={handleOnLike} />
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
        <Card.Meta
          avatar={<Avatar>{post.User.email[0].toUpperCase()}</Avatar>}
          title={
            <div>
              <span>{post.User.nickname}</span>
              {user && email !== post.User.email && (
                <FollowButton nickname={post.User.nickname} id={post.id} />
              )}
            </div>
          }
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commented && (
        <div>
          {user && <CommentForm post={post} />}
          <List
            style={{ width: '90%', margin: 'auto' }}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(comments) => (
              <li>
                <Comment
                  actions={[<span key="reply-comment">답장</span>]}
                  author={comments.User.email}
                  avatar={
                    <Avatar>{comments.User.nickname[0].toUpperCase()}</Avatar>
                  }
                  content={comments.content}
                  datetime={
                    <Tooltip
                      title={moment().subtract().format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <span>{moment().subtract().fromNow()}</span>
                    </Tooltip>
                  }
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
  }).isRequired,
};

export default PostCard;
