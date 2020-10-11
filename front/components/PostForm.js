import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_UPLOAD_IMAGE,
} from '../reducers/post';

const PostForm = () => {
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

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((src) => formData.append('image', src));
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const handleOnRef = useCallback(() => {
    console.log(InputRef.current);
    InputRef.current.click();
  }, []);

  const handleOnUpload = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (value) => {
      imageFormData.append('image', value);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
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
        {imagePaths.map((v, i) => (
          <div
            style={{
              marginTop: '10px',
              display: 'inline-block',
              maxWidth: '50%',
            }}
            key={v}
          >
            <img
              style={{ maxWidth: '100%' }}
              src={`http://localhost:3065/${v}`}
              alt={v}
            />
            <div style={{ marginBottom: '10px' }}>
              <Button onClick={handleOnRemoveImage(i)}>삭제</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
