import React, { useCallback, useState, useEffect } from 'react';
import { Card, Popover, Button, Avatar, Comment, List, Tooltip } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const { user, logInDone } = useSelector((state) => state.user);

  const email = user?.email;

  useEffect(() => {
    if (!logInDone) {
      setLiked(false);
    }
  }, [logInDone]);

  const handleOnLike = useCallback(() => {
    if (!logInDone) {
      return;
    }
    setLiked((prev) => !prev);
  }, [logInDone]);
  const handleOnComment = useCallback(() => {
    setCommented((prev) => !prev);
  }, []);
  return (
    <div>
      <Card
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
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
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
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commented && (
        <div>
          {logInDone && <CommentForm post={post} />}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(comments) => (
              <li>
                <Comment
                  actions={[<span key="reply-comment">답장</span>]}
                  author={comments.User.email}
                  avatar={
                    <Avatar>{comments.User.email[0].toUpperCase()}</Avatar>
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
