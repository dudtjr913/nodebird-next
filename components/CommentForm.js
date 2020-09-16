import React, { useCallback, useState } from 'react';
import { Input, Form, Button } from 'antd';

const CommentForm = ({ post }) => {
	const [comment, setComment] = useState('');
	const onChangeText = useCallback((e) => {
		setComment(e.target.value);
	}, []);
	const onCommentSubmit = useCallback(() => {
		console.log(post.Comments, comment);
		setComment('');
	}, [comment]);
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
					htmlType="submit">
					작성
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CommentForm;
