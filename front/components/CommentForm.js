import React, { useCallback, useState, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, ADD_RECOMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ postId, commentId, reCommentDone }) => {
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
    if (commentId) {
      dispatch({
        type: ADD_RECOMMENT_REQUEST,
        data: {
          comment,
          postId,
          commentId,
        },
      });
      return reCommentDone(null);
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        comment,
        postId,
      },
    });
  }, [comment, postId, commentId]);

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
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  commentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  reCommentDone: PropTypes.func,
};

export default CommentForm;
