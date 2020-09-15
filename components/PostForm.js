import React, { useCallback, useState, useRef } from 'react';
import { Input, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
	const InputRef = useRef();
	const { imagePaths } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const onChangeText = useCallback((e) => {
		setText(e.target.value);
	}, []);
	const onSubmit = useCallback(() => {
		dispatch(addPost);
		setText('');
	}, []);
	const handleOnRef = useCallback(() => {
		console.log(InputRef.current);
		InputRef.current.click();
	}, []);
	return (
		<Form encType="multipart/form-data" onFinish={onSubmit}>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={150}
				placeholder="오늘 있었던 일 소개하기!"
			/>
			<input type="file" multiple hidden ref={InputRef} />
			<Button onClick={handleOnRef}>이미지 업로드</Button>
			<Button type="primary" htmlType="submit" style={{ float: 'right' }}>
				올리기
			</Button>
			<div>
				{imagePaths.map((v) => (
					<div key={v}>
						<img src={v} alt={v} />
						<div>
							<Button>삭제</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
