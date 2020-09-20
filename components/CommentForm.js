import React, { useCallback, useState, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const onChangeText = useCallback((e) => {
    setComment(e.target.value);
  }, []);
  const { commentAddDone } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (commentAddDone) {
      setComment('');
    }
  }, [commentAddDone]);

  const onCommentSubmit = useCallback(() => {
    dispatch(
      addComment({
        text: comment,
        postId: post.id,
        nickname: user.nickname,
        email: user.email,
      }),
    );
  }, [comment, post.id, user.email, user.nickname]);
  return (
    <Form onFinish={onCommentSubmit}>
      <Form.Item>
        <Input.TextArea
          rows={4}
          style={{ marginTop: '5px' }}
          maxLength={150}
          onChange={onChangeText}
          value={comment}
          placeholder="댓글"
        />
        <Button
          style={{ float: 'right', marginTop: '5px' }}
          type="primary"
          htmlType="submit"
        >
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
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

export default CommentForm;
