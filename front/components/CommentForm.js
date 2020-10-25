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
  const { commentAddDone, commentAddLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    if (commentAddDone) {
      setComment('');
    }
  }, [commentAddDone]);

  const onCommentSubmit = useCallback(() => {
    if (!comment) {
      return alert('댓글을 작성해주세요.');
    }
    return dispatch(
      addComment({
        comment,
        postId: post.id,
      }),
    );
  }, [comment, post.id]);
  return (
    <Form onFinish={onCommentSubmit} style={{ width: '90%', margin: 'auto' }}>
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
          loading={commentAddLoading}
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
