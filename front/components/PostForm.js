import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_UPLOAD_IMAGE,
  EDIT_POST_REQUEST,
} from '../reducers/post';

const PostForm = ({ postEdit, content, postId, setPostEdit }) => {
  const InputRef = useRef();
  const { imagePaths, postAddLoading, postAddDone } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    if (postAddDone) {
      setText('');
    }
  }, [postAddDone]);

  useEffect(() => {
    if (postEdit) {
      setText(content);
    }
  }, [postEdit]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('글을 작성해주세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((src) => formData.append('image', src));
    formData.append('content', text);
    if (postEdit) {
      const reConfirm = window.confirm('정말로 게시글을 수정하시겠습니까?');
      if (!reConfirm) {
        return null;
      }
      dispatch({
        type: EDIT_POST_REQUEST,
        data: formData,
        postId,
      });
      return setPostEdit(false);
    }
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths, postEdit]);

  const handleOnRef = useCallback(() => {
    console.log(InputRef.current);
    InputRef.current.click();
  }, []);

  const handleOnUpload = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (value) => {
      imageFormData.append('image', value);
    });
    console.log(postId);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
      postId,
    });
  }, []);

  const handleOnRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_UPLOAD_IMAGE,
        data: index,
      });
    },
    [],
  );
  return (
    <Form
      style={{ width: '90%', margin: 'auto' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={150}
        placeholder="오늘 있었던 일 소개하기!"
      />
      <input
        type="file"
        multiple
        hidden
        name="image"
        ref={InputRef}
        onChange={handleOnUpload}
      />
      <Button onClick={handleOnRef}>이미지 업로드</Button>
      <Button
        loading={postAddLoading}
        type="primary"
        htmlType="submit"
        style={{ float: 'right' }}
      >
        올리기
      </Button>
      <div>
        {imagePaths.map(
          (v, i) =>
            v.id === postId && (
              <div
                style={{
                  marginTop: '10px',
                  display: 'inline-block',
                  maxWidth: '50%',
                }}
                key={v.imagePath}
              >
                <img
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                  src={`http://localhost:3065/${v.imagePath}`}
                  alt={v.imagePath}
                />
                <div style={{ marginBottom: '10px' }}>
                  <Button onClick={handleOnRemoveImage(i)}>삭제</Button>
                </div>
              </div>
            ),
        )}
      </div>
    </Form>
  );
};

PostForm.propTypes = {
  postEdit: PropTypes.bool,
  content: PropTypes.string,
  postId: PropTypes.number,
  setPostEdit: PropTypes.func,
};

export default PostForm;
